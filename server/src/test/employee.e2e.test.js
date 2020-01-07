const request = require("supertest");
const app = require("../app");
const getConnection = require("../db");
const errors = require("../errors");

describe("employee", () => {
    let token;

    beforeAll(async () => {
        const response = await request(app)
            .post("/api/employee/login")
            .send({
                login: process.env.ADMIN_USERNAME,
                password: process.env.ADMIN_PASSWORD,
            });
        token = response.body.token;
    });

    afterAll(async () => {
        const conn = await getConnection();
        await conn.query("DELETE FROM employee");
        await conn.query("ALTER TABLE employee AUTO_INCREMENT = 1");
        await conn.close();
    });

    test("create employee", () => {
        return request(app)
            .post("/api/employee")
            .set("authorization", token)
            .send({
                name: "name",
                login: "post_login",
                password: "password",
                date_of_birth: "1997-07-17",
                address: "address",
            })
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                    }),
                );
            });
    });

    test("get list of employees without me", () => {
        return request(app)
            .get("/api/employee")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(1);
                const actual = response.body[0];
                expect(actual).toEqual({
                    name: "name",
                    login: "post_login",
                    id_employee: 2,
                    is_admin: 0,
                    date_of_birth: "1997-07-16T20:00:00.000Z",
                    address: "address",
                });
                expect("password" in actual).toBeFalsy();
            });
    });

    test("throw not authorized error if login as not existing user", async () => {
        const expected = errors.NotAuthorized();
        const response = await request(app)
            .post("/api/employee/login")
            .send({ login: "non_existing_login", password: "password" })
            .expect(expected.statusCode);
        const error = response.body;
        expect(error).toStrictEqual(expected);
    });

    test("get list of size 2 starting from id = 2", async () => {
        for (const i of [1, 2, 3]) {
            await request(app)
                .post("/api/employee")
                .set("authorization", token)
                .send({
                    name: `name_${i}`,
                    login: `login_${i}`,
                    password: "password",
                    date_of_birth: "1997-07-17",
                    address: "address",
                })
                .expect(200);
        }
        return request(app)
            .get("/api/employee?scroll=3&limit=2")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                const expected = {
                    address: "address",
                    is_admin: 0,
                    date_of_birth: "1997-07-16T20:00:00.000Z",
                };
                expect(response.body.length).toEqual(2);
                expect(response.body[0]).toEqual({
                    id_employee: 3,
                    name: "name_1",
                    login: "login_1",
                    ...expected,
                });
                expect(response.body[1]).toEqual({
                    id_employee: 4,
                    name: "name_2",
                    login: "login_2",
                    ...expected,
                });
            });
    });

    test("get employee by id = 2", () => {
        return request(app)
            .get("/api/employee/2")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({
                    name: "name",
                    login: "post_login",
                    id_employee: 2,
                    is_admin: 0,
                    date_of_birth: "1997-07-16T20:00:00.000Z",
                    address: "address",
                });
            });
    });

    describe("update employee suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/employee")
                .set("authorization", token)
                .send({
                    name: "name",
                    login: "update_login",
                    password: "password",
                    date_of_birth: "1997-07-17",
                    address: "address",
                })
                .expect(200);
            id = response.body.id;
        });

        afterAll(async () => request(app).delete(`/api/employee/${id}`));

        test("update employee", async () => {
            return request(app)
                .put(`/api/employee/${id}`)
                .set("authorization", token)
                .send({ name: "new_name", address: "new_address" })
                .expect(200);
        });

        test("ensure employee updated", async () => {
            const response = await request(app)
                .get(`/api/employee/${id}`)
                .set("authorization", token)
                .expect(200);
            const { name, address } = response.body;
            expect(name).toBe("new_name");
            expect(address).toBe("new_address");
        });

        describe("password update suite", () => {
            beforeAll(async () => {
                await request(app)
                    .put(`/api/employee/${id}`)
                    .set("authorization", token)
                    .send({ password: "new_password" })
                    .expect(200);
            });

            test("can login with old password", async () => {
                return request(app)
                    .post("/api/employee/login")
                    .expect(200)
                    .send({
                        login: "update_login",
                        password: "password",
                    });
            });
        });
    });

    describe("delete employee suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/employee")
                .set("authorization", token)
                .send({
                    name: "name",
                    login: "delete_login",
                    password: "password",
                    date_of_birth: "1997-07-17",
                    address: "address",
                })
                .expect(200);
            id = response.body.id;
        });

        test("delete employee", async () => {
            return request(app)
                .delete(`/api/employee/${id}`)
                .set("authorization", token)
                .expect(200);
        });

        test("ensure employee deleted", async () => {
            const expected = errors.NotFound(`Employee with id ${id} not found`);
            const response = await request(app)
                .get(`/api/employee/${id}`)
                .set("authorization", token)
                .expect(expected.statusCode);
            const error = response.body;
            expect(error).toStrictEqual(expected);
        });

        test("error if deleting myself", async () => {
            const expected = errors.BadRequest("Cannot delete myself");
            const response = await request(app)
                .delete(`/api/employee/1`)
                .set("authorization", token)
                .expect(expected.statusCode);
            const error = response.body;
            expect(error).toStrictEqual(expected);
        });
    });
});
