const request = require("supertest");
const app = require("../app");
const getConnection = require("../db");

describe("author", () => {
    let token;

    beforeAll(async () => {
        const conn = await getConnection();
        await conn.query("DELETE FROM author");
        await conn.query("ALTER TABLE author AUTO_INCREMENT = 1");
        await conn.query("DELETE FROM publishing_office");
        await conn.query("ALTER TABLE publishing_office AUTO_INCREMENT = 1");
        await conn.execute(
            `
                INSERT INTO publishing_office(name, address, email)
                VALUES(?, ?, ?)
            `,
            ["name", "address", "email@email.com"],
        );

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
        await conn.query("DELETE FROM author");
        await conn.query("ALTER TABLE author AUTO_INCREMENT = 1");
        await conn.query("DELETE FROM publishing_office");
        await conn.query("ALTER TABLE publishing_office AUTO_INCREMENT = 1");
        await conn.close();
    });

    test("create author", () => {
        return request(app)
            .post("/api/author")
            .set("authorization", token)
            .send({
                name: "name",
                surname: "surname",
                date_of_birth: "1980-01-01",
                id_publishing_office: 1,
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

    test("get list of authors", () => {
        return request(app)
            .get("/api/author")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.rows.length).toEqual(1);
                expect(response.body.rows[0]).toEqual({
                    id_author: 1,
                    name: "name",
                    surname: "surname",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    id_publishing_office: 1,
                });
            });
    });

    test("get list of size 2 starting from id = 2", async () => {
        await Promise.all(
            [1, 2, 3].map(async i => {
                return request(app)
                    .post("/api/author")
                    .set("authorization", token)
                    .send({
                        name: `name ${i + 1}`,
                        surname: "surname",
                        date_of_birth: "1980-01-01",
                        id_publishing_office: 1,
                    })
                    .expect(200);
            }),
        );
        return request(app)
            .get("/api/author?scroll=2&limit=2")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.rows.length).toEqual(2);
                expect(response.body.rows[0]).toEqual({
                    id_author: 2,
                    name: "name 2",
                    surname: "surname",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    id_publishing_office: 1,
                });
                expect(response.body.rows[1]).toEqual({
                    id_author: 3,
                    name: "name 3",
                    surname: "surname",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    id_publishing_office: 1,
                });
            });
    });

    test("get author by id = 1", () => {
        return request(app)
            .get("/api/author/1")
            .set("authorization", token)
            .expect(200)
            .then(response => {
                expect(response.body.row).toEqual({
                    id_author: 1,
                    name: "name",
                    surname: "surname",
                    date_of_birth: "1979-12-31T21:00:00.000Z",
                    id_publishing_office: 1,
                });
                expect(response.body.relation.publishing_office).toEqual({
                    id_publishing_office: 1,
                    name: "name",
                    address: "address",
                    email: "email@email.com",
                });
            });
    });

    describe("update author suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/author")
                .set("authorization", token)
                .send({
                    name: "name",
                    surname: "surname",
                    date_of_birth: "1980-01-01",
                    id_publishing_office: 1,
                })
                .expect(200);
            id = response.body.id;
        });

        afterAll(async () => request(app).delete(`/api/author/${id}`));

        test("update author", async () => {
            return request(app)
                .put(`/api/author/${id}`)
                .set("authorization", token)
                .send({ name: "new_name", surname: "new_surname" })
                .expect(200);
        });

        test("ensure author updated", async () => {
            const response = await request(app)
                .get(`/api/author/${id}`)
                .set("authorization", token)
                .expect(200);
            const { name, surname } = response.body.row;
            expect(name).toBe("new_name");
            expect(surname).toBe("new_surname");
        });
    });

    describe("delete author suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/author")
                .set("authorization", token)
                .send({
                    name: "name",
                    surname: "surname",
                    date_of_birth: "1980-01-01",
                    id_publishing_office: 1,
                })
                .expect(200);
            id = response.body.id;
        });

        test("delete author", async () => {
            return request(app)
                .delete(`/api/author/${id}`)
                .set("authorization", token)
                .expect(200);
        });

        test("ensure author deleted", async () => {
            const response = await request(app)
                .get(`/api/author/${id}`)
                .set("authorization", token)
                .expect(404);
            const error = response.body;
            expect(error).toStrictEqual({
                status: "Not Found",
                message: `Author with id ${id} not found`,
                statusCode: 404,
            });
        });
    });
});
