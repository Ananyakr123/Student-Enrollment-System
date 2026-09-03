const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "student backend server is running"
    });
});

app.use("/api/students", studentRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);

// Local development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
        console.log("server listening to " + PORT);
    });
}

module.exports = app;