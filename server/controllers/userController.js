import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            role: user.role,
            credits: user.credits,
            card: user.card,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({
            error: "Invalid email and password",
        });
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password, phone, role } =
        req.body;

    //validate password to include at least 1 number, 1 uppercase, 1 lowercase, and 1 special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400);
        throw new Error(
            "Password must be at least 8 characters and include at least 1 number, 1 uppercase, 1 lowercase, and 1 special character"
        );
    }

    try {
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password,
            phone,
            role,
            credits: 0,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phone: user.phone,
                role: user.role,
                credits: user.credits,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            role: user.role,
            credits: user.credits,
            card: user.card,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    try {
        if (user) {
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.firstName) {
                user.firstName = req.body.firstName;
            }
            if (req.body.lastName) {
                user.lastName = req.body.lastName;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.phone) {
                user.phone = req.body.phone;
            }
            if (req.body.role) {
                user.role = req.body.role;
            }
            if (req.body.credits) {
                user.credits = req.body.credits;
            }
            if (req.body.card) {
                user.card = req.body.card;
            }

            const updatedUser = await user.save();

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phone: user.phone,
                role: user.role,
                credits: user.credits,
                card: user.card,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// @desc    Update user role
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            role: user.role,
            credits: user.credits,
            card: user.card,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
        res.json({ message: "User deleted successfully" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc    Get user by username and role
// @route   GET /api/users/:role/:username
// @access  Public
const getUserByUsernameAndRole = asyncHandler(async (req, res) => {
    const { role, username } = req.params;

    try {
        let user = await User.aggregate([
            {
                $match: {
                    role: role,
                    username: username,
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phone: 1,
                    role: 1,
                    credits: 1,
                    card: 1,
                },
            },
            {
                $limit: 1,
            },
        ]).hint({ role: 1, username: 1, email: 1 });

        if (user._id) {
            user = {
                ...user,
                token: generateToken(user._id),
            };
        } else {
            res.status(404);
            throw new Error("User not found");
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// @desc    Get user by email
// @route   GET /api/users/:email
// @access  Public
const getUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;

    try {
        let user = await User.aggregate([
            {
                $match: {
                    email: email,
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phone: 1,
                    role: 1,
                    credits: 1,
                    card: 1,
                },
            },
            {
                $limit: 1,
            },
        ]).hint({ email: 1 });

        if (user._id) {
            user = {
                ...user,
                token: generateToken(user._id),
            };
        } else {
            res.status(404);
            throw new Error("User not found");
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// @desc    Get user credits
// @route   GET /api/users/credits/:username
// @access  Private
const getUserCredits = asyncHandler(async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.aggregate([
            {
                $match: {
                    username: username,
                    _id: req.user._id,
                },
            },
            {
                $project: {
                    credits: 1,
                },
            },
            {
                $limit: 1,
            },
        ]).hint({ username: 1, credits: 1 });

        if (user) {
            res.json(user);
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

// @desc    Update user credits
// @route   PUT /api/users/credits/:username
// @access  Private
const updateUserCredits = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const { credits } = req.body;

    try {
        const user = await User.findOne({
            username: username,
            _id: req.user._id,
        }).hint({
            username: 1,
            credits: 1,
        });

        if (user) {
            user.credits = credits;

            const updatedUser = await user.save();

            res.json({
                credits: updatedUser.credits,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
    getUserByUsernameAndRole,
    getUserCredits,
    updateUserCredits,
    getUserByEmail,
};
