import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
        },
        employeeName: {
            type: String,
            required: true,
        },
        employeeRole: {
            type: String,
            enum: ["Manager", "Inspector"],
            required: true,
        },
        employeeDepot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Depot",
        },
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
