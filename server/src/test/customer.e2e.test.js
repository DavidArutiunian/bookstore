const request = require("supertest");
const app = require("../app");
const getConnection = require("../db");
const errors = require("../errors");

describe("customers", () => {
    let token;

    beforeAll(async () => {
        const conn = await getConnection();
        await conn.query("DELETE FROM customer");
        await conn.query("ALTER TABLE customer AUTO_INCREMENT = 1");

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
        await conn.query("DELETE FROM customer");
        await conn.query("ALTER TABLE customer AUTO_INCREMENT = 1");
        await conn.close();
    });

    test("create customer", () => {
        return request(app)
            .post("/api/customer")
            .set("authorization", token)
            .send({
                name: "name",
                date_of_birth: "1980-01-01",
                email: "email@email.com",
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

    test("get list of customers", () => {
        return request(app)
            .get("/api/customer")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(1);
                expect(response.body[0]).toEqual({
                    id_customer: 1,
                    name: "name",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    email: "email@email.com",
                });
            });
    });

    test("get list of size 2 starting from id = 2", async () => {
        await Promise.all(
            [1, 2, 3].map(async i => {
                return request(app)
                    .post("/api/customer")
                    .set("authorization", token)
                    .send({
                        name: `name_${i + 1}`,
                        date_of_birth: "1980-01-01",
                        email: "email@email.com",
                    })
                    .expect(200);
            }),
        );
        return request(app)
            .get("/api/customer?scroll=2&limit=2")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(2);
                expect(response.body[0]).toEqual({
                    id_customer: 2,
                    name: "name_2",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    email: "email@email.com",
                });
                expect(response.body[1]).toEqual({
                    id_customer: 3,
                    name: "name_3",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    email: "email@email.com",
                });
            });
    });

    test("get customer by id = 1", () => {
        return request(app)
            .get("/api/customer/1")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({
                    id_customer: 1,
                    name: "name",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    email: "email@email.com",
                });
            });
    });

    describe("update customer suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/customer")
                .set("authorization", token)
                .send({ name: "name", date_of_birth: "1980-01-01", email: "new@email.com" })
                .expect(200);
            id = response.body.id;
        });

        afterAll(async () => request(app).delete(`/api/customer/${id}`));

        test("update customer", async () => {
            return request(app)
                .put(`/api/customer/${id}`)
                .set("authorization", token)
                .send({ name: "new_name", email: "new@email.com" })
                .expect(200);
        });

        test("ensure customer updated", async () => {
            const response = await request(app)
                .get(`/api/customer/${id}`)
                .set("authorization", token)
                .expect(200);
            const { name, email } = response.body;
            expect(name).toBe("new_name");
            expect(email).toBe("new@email.com");
        });
    });

    describe("delete customer suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/customer")
                .set("authorization", token)
                .send({ name: "name", date_of_birth: "1980-01-01", email: "email@email.com" })
                .expect(200);
            id = response.body.id;
        });

        test("delete customer", async () => {
            return request(app)
                .delete(`/api/customer/${id}`)
                .set("authorization", token)
                .expect(200);
        });

        test("ensure customer deleted", async () => {
            const expected = errors.NotFound(`Customer with id ${id} not found`);
            const response = await request(app)
                .get(`/api/customer/${id}`)
                .set("authorization", token)
                .expect(expected.statusCode);
            const error = response.body;
            expect(error).toStrictEqual(expected);
        });
    });
});
