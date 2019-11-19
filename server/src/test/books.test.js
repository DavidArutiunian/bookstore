const app = require("app");
const request = require("supertest");
const getConnection = require("db");

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
});
