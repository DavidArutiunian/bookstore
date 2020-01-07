const request = require("supertest");
const app = require("../app");
const getConnection = require("../db");
const errors = require("../errors");

describe("publishing office", () => {
    let token;

    beforeAll(async () => {
        const conn = await getConnection();
        await conn.query("DELETE FROM publishing_office");
        await conn.query("ALTER TABLE publishing_office AUTO_INCREMENT = 1");

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
        await conn.query("DELETE FROM publishing_office");
        await conn.query("ALTER TABLE publishing_office AUTO_INCREMENT = 1");
        await conn.close();
    });

    test("create publishing office", () => {
        return request(app)
            .post("/api/publishing_office")
            .set("authorization", token)
            .send({
                name: "name",
                address: "address",
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

    test("get list of publishing offices", () => {
        return request(app)
            .get("/api/publishing_office")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(1);
                expect(response.body[0]).toEqual({
                    id_publishing_office: 1,
                    name: "name",
                    address: "address",
                    email: "email@email.com",
                });
            });
    });

    test("get list of size 2 starting from id = 2", async () => {
        await Promise.all(
            [1, 2, 3].map(async i => {
                return request(app)
                    .post("/api/publishing_office")
                    .set("authorization", token)
                    .send({
                        name: `name_${i + 1}`,
                        address: "address",
                        email: "email@email.com",
                    })
                    .expect(200);
            }),
        );
        return request(app)
            .get("/api/publishing_office?scroll=2&limit=2")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(2);
                expect(response.body[0]).toEqual({
                    id_publishing_office: 2,
                    name: "name_2",
                    address: "address",
                    email: "email@email.com",
                });
                expect(response.body[1]).toEqual({
                    id_publishing_office: 3,
                    name: "name_3",
                    address: "address",
                    email: "email@email.com",
                });
            });
    });

    test("get publishing office by id = 1", () => {
        return request(app)
            .get("/api/publishing_office/1")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({
                    id_publishing_office: 1,
                    name: "name",
                    address: "address",
                    email: "email@email.com",
                });
            });
    });

    describe("update publishing office suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/publishing_office")
                .set("authorization", token)
                .send({ name: "name", address: "new_address", email: "new@email.com" })
                .expect(200);
            id = response.body.id;
        });

        afterAll(async () => request(app).delete(`/api/publishing_office/${id}`));

        test("update publishing office", async () => {
            return request(app)
                .put(`/api/publishing_office/${id}`)
                .set("authorization", token)
                .send({ address: "new_address", email: "new@email.com" })
                .expect(200);
        });

        test("ensure publishing office updated", async () => {
            const response = await request(app)
                .get(`/api/publishing_office/${id}`)
                .set("authorization", token)
                .expect(200);
            const { address, email } = response.body;
            expect(address).toBe("new_address");
            expect(email).toBe("new@email.com");
        });
    });

    describe("delete publishing office suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/publishing_office")
                .set("authorization", token)
                .send({ name: "name", address: "address", email: "email@email.com" })
                .expect(200);
            id = response.body.id;
        });

        test("delete publishing office", async () => {
            return request(app)
                .delete(`/api/publishing_office/${id}`)
                .set("authorization", token)
                .expect(200);
        });

        test("ensure publishing office deleted", async () => {
            const expected = errors.NotFound(`Publishing Office with id ${id} not found`);
            const response = await request(app)
                .get(`/api/publishing_office/${id}`)
                .set("authorization", token)
                .expect(expected.statusCode);
            const error = response.body;
            expect(error).toStrictEqual(expected);
        });
    });
});
