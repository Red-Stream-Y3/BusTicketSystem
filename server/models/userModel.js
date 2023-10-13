import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            pattern: "^[a-zA-Z0-9_]*$",
        },
        firstName: {
            type: String,
            pattern: "^[a-zA-Z]*$",
            default: "",
        },
        lastName: {
            type: String,
            pattern: "^[a-zA-Z]*$",
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: "",
            pattern: "^[0-9]*$",
        },
        role: {
            type: String,
            enum: ["passenger", "driver", "manager", "admin", "ínspector"],
            default: "passenger",
            required: true,
        },
        credits: {
            type: Number,
            default: 0,
            required: true,
        },
        card: {
            cardNumber: { type: String, default: "" },
            expirationDate: { type: String, default: "" },
            cvv: { type: String, default: "" },
        },
    },
    {
        timestamps: true,
    }
);

//create indexes
userSchema.index({ role: 1, username: 1, email: 1 }, { unique: true });
userSchema.index({ username: 1, credits: 1 });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        // if the password is not modified, then do not hash it again
        next();
    }

    const salt = await bcrypt.genSalt(10); // 10 rounds of encryption
    this.password = await bcrypt.hash(this.password, salt); // hash the password with salt value
});

const User = mongoose.model("User", userSchema);

export default User;
