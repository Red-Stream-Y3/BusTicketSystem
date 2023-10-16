const request = require("supertest");
import app from "./testserver.js";
import mongoose from "mongoose";

const user = {};
const config = {
    authorization: `Bearer`,
};

beforeAll(async () => {
    await request(app)
        .post("/api/users/login")
        .send({
            email: "driver@driver.com",
            password: "Driver@1234",
        })
        .then((res) => {
            console.log("logged in");
            user.token = res.body.token;
            user._id = res.body._id.toString();
            user.username = res.body.username;

            config.authorization = config.authorization + " " + user.token;
        });
}, 30000);

afterAll(async () => {
    await mongoose.connection.close();
});

describe("busJourneyController", () => {
    let newJourneyId = "";

    test("should create a new bus journey", async () => {
        const requestBody = {
            bus: "65297b71540db1a04df01663",
            driver: user._id,
            route: "65297df378dbeea811b7f2e5",
            state: "scheduled",
        };

        const response = await request(app)
            .post("/api/busjourneys")
            .set("Authorization", config.authorization)
            .send(requestBody);

        // Expect the response to have been called with the correct data
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");

        newJourneyId = response.body._id;

        expect(response.body).toHaveProperty("state", "scheduled");
        expect(response.body).toHaveProperty("bus", requestBody.bus);
        expect(response.body).toHaveProperty("driver", requestBody.driver);
        expect(response.body).toHaveProperty("route", requestBody.route);
    });

    test("should check if user trip is valid when adding", async () => {
        const requestBody = {
            boardedUser: "65297b71540db1a04df01663",
        };

        const response = await request(app)
            .put(`/api/busjourneys/${newJourneyId}`)
            .set("Authorization", config.authorization)
            .send(requestBody);

        expect(response.status).toBe(405);
        expect(response.body).toHaveProperty("message", "User Trip not found");
    });

    test("should check if user trip is cancelled when adding", async () => {
        const requestBody = {
            boardedUser: "65297edb78dbeea811b7f2e7",
        };

        const response = await request(app)
            .put(`/api/busjourneys/${newJourneyId}`)
            .set("Authorization", config.authorization)
            .send(requestBody);

        expect(response.status).toBe(405);
        expect(response.body).toHaveProperty(
            "message",
            "User Trip is cancelled"
        );
    });

    test("should update a bus journey status", async () => {
        const requestBody = {
            state: "completed",
        };

        const response = await request(app)
            .put(`/api/busjourneys/${newJourneyId}`)
            .set("Authorization", config.authorization)
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("state", "completed");
    });

    test("should get bus journey by id", async () => {
        const response = await request(app)
            .get(`/api/busjourneys/${newJourneyId}`)
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("state", "completed");
    });

    test("should get all bus journeys", async () => {
        const response = await request(app)
            .get(`/api/busjourneys`)
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test("should delete a bus journey", async () => {
        const response = await request(app)
            .delete(`/api/busjourneys/${newJourneyId}`)
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Bus Journey removed");
    });
});
