const Mentor = require("../models/mentor");


// GET ALL MENTORS
const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();

        if (mentors.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No mentors found"
            });
        }

        return res.status(200).json(mentors);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ADD MENTOR
const addMentors = async (req, res) => {
    try {
        const {
            MentorID,
            name,
            phone,
            email,
            highest_Education,
            experience,
            salary,
            courses
        } = req.body;

        if (
            !name ||
            !phone ||
            !email ||
            !highest_Education ||
            !experience ||
            !MentorID ||
            !courses
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const mentor = await Mentor.create({
            MentorID,
            name,
            phone,
            email,
            highest_Education,
            experience,
            salary,
            courses
        });

        return res.status(201).json({
            success: true,
            message: "Mentor added successfully",
            mentor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET MENTOR BY ID
const getMentorByID = async (req, res) => {
    try {
        console.log(req.params);

        const mentor = await Mentor.findOne({
            MentorID: req.params.MentorID
        });

        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }

        return res.status(200).json({
            success: true,
            mentor
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error finding mentor",
            error: error.message
        });
    }
};


// UPDATE MENTOR
const updateMentor = async (req, res) => {
    try {
        const data = await Mentor.findOneAndUpdate(
            {
                MentorID: req.params.MentorID
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mentor updated successfully",
            mentor: data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating mentor",
            error: error.message
        });
    }
};


// DELETE MENTOR
const deleteMentor = async (req, res) => {
    try {
        const response = await Mentor.findOneAndDelete({
            MentorID: req.params.MentorID
        });

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mentor deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete mentor",
            error: error.message
        });
    }
};


module.exports = {
    getMentors,
    addMentors,
    getMentorByID,
    updateMentor,
    deleteMentor
};