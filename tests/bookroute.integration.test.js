const express = require("express");
const request = require("supertest");
const bookRoute = require("../routes/books.route.js");

const app = express();

app.use(express.json());
app.use("/api/books", bookRoute);

describe("Integration test", ()=>{
    it('GET /api/books - success - get all the books ', async ()=>{
        const{body, statusCode} = await request(app).get("/api/books");

        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    author: expect.any(String)
                })
            ])
        )
        expect(statusCode).toEqual(200)
    })

    it('Post - failure', async ()=>{
        const {body, statusCode} = await request(app).post("/api/books").send({
            name: "",
            author: "Yino"
        });

        expect(statusCode).toEqual(400);
        expect(body).toEqual({
            errors: [
                {
                    location: "body",
                    msg: "Book name is required.",
                    param: "name",
                    value: ""
                }
            ]
        })
    })

    it('Post - Success', async ()=>{
        const {body, statusCode} = await request(app).post("/api/books").send({
            name: "Integration",
            author: "Yino"
        });

        expect(statusCode).toEqual(200);

        expect(body).toEqual([
            {
                message: "Success"
            }
        ])

    })

    it('Put - Failure', async ()=>{
        const {body, statusCode} = await request(app).put("/api/books/5000").send({
            name: "Inter",
            author: "Yino"
        });

        expect(statusCode).toEqual(404);

        expect(body).toEqual({
            errors: true,
            message: "Book not found",
        })

    })

    it('Put - Success', async ()=>{
        const {body, statusCode} = await request(app).put("/api/books/2").send({
            name: "Inter",
            author: "Yino"
        });

        expect(statusCode).toEqual(201);

        expect(body).toEqual({
            id: 2,
            name: "Inter",
            author: "Yino"
        })

    })

})
