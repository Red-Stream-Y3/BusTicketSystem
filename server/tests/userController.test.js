const request = require("supertest");
import app from "./testserver.js";
import mongoose from "mongoose";

const config = {
    authorization: `Bearer`,
};

beforeAll(async () => {
    //
}, 30000);

afterAll(async () => {
    await mongoose.connection.close();
});

describe("userTripController", () => {
    let newUser = {};

    test("should not allow weak passwords", async () => {
        const requestBody = {
            username: "testuser",
            firstName: "test",
            lastName: "user",
            email: "test@redstream.com",
            password: "password", //weak password
        };

        const response = await request(app)
            .post("/api/users")
            .send(requestBody);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty(
            "message",
            "Password must be at least 8 characters and include at least 1 number, 1 uppercase, 1 lowercase, and 1 special character"
        );
    });

    test("should create a new user", async () => {
        const requestBody = {
            username: "testuser",
            firstName: "test",
            lastName: "user",
            email: "test@redstream.com",
            password: "TestUser@1234", //strong password
        };

        const response = await request(app)
            .post("/api/users")
            .send(requestBody);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("username", requestBody.username);
        expect(response.body).toHaveProperty(
            "firstName",
            requestBody.firstName
        );
        expect(response.body).toHaveProperty("lastName", requestBody.lastName);
        expect(response.body).toHaveProperty("email", requestBody.email);
        expect(response.body).toHaveProperty("credits", 0);

        newUser = {
            _id: response.body._id,
            username: response.body.username,
            firstName: response.body.firstName,
            lastName: response.body.lastName,
            email: response.body.email,
            password: requestBody.password,
            credits: response.body.credits,
        };
    }, 30000);

    test("should not allow duplicate combination of username & email", async () => {
        const requestBody = {
            username: newUser.username,
            firstName: "test",
            lastName: "user",
            email: newUser.email,
            password: "TestUser@1234",
        };

        const response = await request(app)
            .post("/api/users")
            .send(requestBody);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("should login user", async () => {
        const requestBody = {
            email: newUser.email,
            password: newUser.password,
        };

        const response = await request(app)
            .post("/api/users/login")
            .send(requestBody);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("username", newUser.username);
        expect(response.body).toHaveProperty("firstName", newUser.firstName);
        expect(response.body).toHaveProperty("lastName", newUser.lastName);
        expect(response.body).toHaveProperty("email", newUser.email);
        expect(response.body).toHaveProperty("credits", newUser.credits);
        expect(response.body).toHaveProperty("token");

        config.authorization = config.authorization + " " + response.body.token;
    });

    test("Should not allow credits to be negative", async () => {
        const requestBody = {
            credits: -1,
        };

        const response = await request(app)
            .put("/api/users/credits/" + newUser.username)
            .set("Authorization", config.authorization + " " + newUser.token)
            .send(requestBody);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty(
            "error",
            "User validation failed: credits: Credits cannot be negative"
        );
    });

    test("should delete user", async () => {
        const response = await request(app)
            .delete("/api/users/" + newUser._id)
            .set("Authorization", config.authorization);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            "message",
            "User deleted successfully"
        );
    });
});
