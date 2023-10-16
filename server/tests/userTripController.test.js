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
            email: "passenger@passenger.com",
            password: "Passenger@1234",
        })
        .then((res) => {
            console.log("logged in");
            user.token = res.body.token;
            user._id = res.body._id.toString();
            user.username = res.body.username;
            user.credits = res.body.credits;

            config.authorization = config.authorization + " " + user.token;
        });
}, 30000);

afterAll(async () => {
    await mongoose.connection.close();
});

describe("userTripController", () => {
    let newUserTripId = "";

    test("should check if user has enough credits to book a trip", async () => {
        const requestBody = {
            route: "65297df378dbeea811b7f2e5",
            origin: "65297c866cfd9d5cd1946304",
            destination: "65297cc56cfd9d5cd1946306",
            state: "scheduled",
            fare: 3000, //higher than user's credits
        };

        const response = await request(app)
            .post("/api/usertrips")
            .set("Authorization", config.authorization)
            .send(requestBody);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty(
            "message",
            "Insufficient credits. You have too many unpaid trips."
        );
    });

    test("should create a new user trip", async () => {
        const requestBody = {
            route: "65297df378dbeea811b7f2e5",
            origin: "65297c866cfd9d5cd1946304",
            destination: "65297cc56cfd9d5cd1946306",
            state: "scheduled",
            fare: 1,
        };

        const response = await request(app)
            .post("/api/usertrips")
            .set("Authorization", config.authorization)
            .send(requestBody);

        // Expect the response to have been called with the correct data
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");

        newUserTripId = response.body._id;

        expect(response.body).toHaveProperty("state", "scheduled");
        expect(response.body).toHaveProperty("origin", requestBody.origin);
        expect(response.body).toHaveProperty(
            "destination",
            requestBody.destination
        );
    });

    test("should get all user trips", async () => {
        const response = await request(app)
            .get("/api/usertrips")
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test("should get all user trips with limit", async () => {
        const response = await request(app)
            .get("/api/usertrips/get/2")
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(2);
    });

    test("should update departure time & payment when boarded", async () => {
        const requestBody = {
            state: "boarded",
        };

        const response = await request(app)
            .put(`/api/usertrips/${newUserTripId}`)
            .set("Authorization", config.authorization)
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("state", "boarded");

        //check if automated departure time is set
        expect(response.body).toHaveProperty("departureTime");
        expect(response.body.departureTime).not.toBe(null);

        //check if payment is set to true
        expect(response.body).toHaveProperty("paid", true);
    });

    test("should update arrival time when completed", async () => {
        const requestBody = {
            state: "completed",
        };

        const response = await request(app)
            .put(`/api/usertrips/${newUserTripId}`)
            .set("Authorization", config.authorization)
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("state", "completed");

        //check if automated arrival time is set
        expect(response.body).toHaveProperty("arrivalTime");
        expect(response.body.arrivalTime).not.toBe(null);
    });

    test("should automatically make payment when boarded", async () => {
        const response = await request(app)
            .get(`/api/users/credits/${user.username}`)
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("credits");
        expect(response.body[0].credits).toBe(user.credits - 1); //fare is 1
    });

    test("should delete a user trip", async () => {
        const response = await request(app)
            .delete(`/api/usertrips/${newUserTripId}`)
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Trip removed");
    });
});
