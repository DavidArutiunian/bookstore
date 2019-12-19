const request = require("supertest");
const app = require("../app");
const getConnection = require("../db");

afterAll(async () => {
    const conn = await getConnection();
    await conn.execute("DELETE FROM book");
    await conn.execute("ALTER TABLE book AUTO_INCREMENT = 1");
    await conn.close();
});

describe("books", () => {
    test("create book", () => {
        return request(app)
            .post("/api/books")
            .send({
                title: "title",
                year: 2000,
                cost: 2000,
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

    test("get list of books", () => {
        return request(app)
            .get("/api/books")
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(1);
                expect(response.body[0]).toEqual({
                    id_book: 1,
                    title: "title",
                    year: 2000,
                    cost: "2000.00",
                });
            });
    });

    test("get list of size 2 starting from id = 2", async () => {
        await Promise.all(
            [1, 2, 3].map(async i => {
                return request(app)
                    .post("/api/books")
                    .send({
                        title: `title ${i + 1}`,
                        year: 2000,
                        cost: 2000 * (i + 1),
                    })
                    .expect(200);
            }),
        );
        return request(app)
            .get("/api/books?scroll=2&limit=2")
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(2);
                expect(response.body[0]).toEqual({
                    id_book: 2,
                    title: "title 2",
                    year: 2000,
                    cost: "4000.00",
                });
                expect(response.body[1]).toEqual({
                    id_book: 3,
                    title: "title 3",
                    year: 2000,
                    cost: "6000.00",
                });
            });
    });

    test("get book by id = 1", () => {
        return request(app)
            .get("/api/books/1")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({
                    id_book: 1,
                    title: "title",
                    year: 2000,
                    cost: "2000.00",
                });
            });
    });

    describe("update book suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/books")
                .send({ title: "title", year: 2010, cost: 1500 })
                .expect(200);
            id = response.body.id;
        });

        afterAll(async () => request(app).delete(`/api/books/${id}`));

        test("update book", async () => {
            return request(app)
                .put(`/api/books/${id}`)
                .send({ year: 2008, cost: 1000 })
                .expect(200);
        });

        test("ensure book updated", async () => {
            const response = await request(app)
                .get(`/api/books/${id}`)
                .expect(200);
            const { year, cost } = response.body;
            expect(year).toBe(2008);
            expect(cost).toBe("1000.00");
        });
    });

    describe("delete book suite", () => {
        let id;

        beforeAll(async () => {
            const response = await request(app)
                .post("/api/books")
                .send({ title: "title", year: 2010, cost: 1500 })
                .expect(200);
            id = response.body.id;
        });

        test("delete book", async () => {
            return request(app)
                .delete(`/api/books/${id}`)
                .expect(200);
        });

        test("ensure book deleted", async () => {
            const response = await request(app)
                .get(`/api/books/${id}`)
                .expect(404);
            const error = response.body;
            expect(error).toStrictEqual({
                status: "Not Found",
                message: `Book with id ${id} not found`,
                statusCode: 404,
            });
        });
    });
});
