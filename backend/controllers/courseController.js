const Course = require("../models/course");
const Mentor = require("../models/mentor");




const addCourse = async (req, res) => {
    try {
        const {
            CourseID,
            name,
            mentor,
            description,
            duration,
            fee
        } = req.body;

        if (!name || !description || !duration || !fee || !mentor || !CourseID) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if CourseID already exists
        const existingCourseID = await Course.findOne({ CourseID });

        if (existingCourseID) {
            return res.status(409).json({
                success: false,
                message: "Course ID already exists"
            });
        }

        // Check if course name already exists
        const existingCourse = await Course.findOne({ name });

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists"
            });
        }

        // Check whether mentor exists
        const mentorExists = await Mentor.findById(mentor);

        if (!mentorExists) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }

        // Create course
        const course = await Course.create({
            CourseID,
            name,
            mentor,
            description,
            duration,
            fee
        });

        // Add CourseID to mentor's courses array
        await Mentor.findByIdAndUpdate(
            mentor,
            {
                $addToSet: {
                    courses: CourseID
                }
            }
        );

        return res.status(201).json({
            success: true,
            message: "Course added successfully",
            course
        });

    } catch (error) {

        console.log("ADD COURSE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET ALL COURSES =================

const getAllCourses = async (req, res) => {
    try {

        const response = await Course.find()
            .populate("mentor", "MentorID name email");

        return res.status(200).json(response);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= GET COURSE BY ID =================

const getCourses = async (req, res) => {
    try {

        const response = await Course.findOne({
            CourseID: req.params.CourseID
        }).populate("mentor", "MentorID name email");

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json(response);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= UPDATE COURSE =================

const updateCourses = async (req, res) => {
    try {

        // First find the existing course
        const oldCourse = await Course.findOne({
            CourseID: req.params.CourseID
        });

        if (!oldCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const oldMentor = oldCourse.mentor;
        const newMentor = req.body.mentor;

        /*
         * If mentor has been changed:
         *
         * Old mentor:
         * courses: ["C001", "C002"]
         *
         * New mentor:
         * courses: ["C003"]
         *
         * After update:
         *
         * Old mentor:
         * courses: ["C002"]
         *
         * New mentor:
         * courses: ["C003", "C001"]
         */

        if (
            newMentor &&
            oldMentor?.toString() !== newMentor.toString()
        ) {

            // Check new mentor exists
            const mentorExists = await Mentor.findById(newMentor);

            if (!mentorExists) {
                return res.status(404).json({
                    success: false,
                    message: "New mentor not found"
                });
            }

            // Remove CourseID from old mentor
            if (oldMentor) {

                await Mentor.findByIdAndUpdate(
                    oldMentor,
                    {
                        $pull: {
                            courses: oldCourse.CourseID
                        }
                    }
                );

            }

            // Add CourseID to new mentor
            await Mentor.findByIdAndUpdate(
                newMentor,
                {
                    $addToSet: {
                        courses: oldCourse.CourseID
                    }
                }
            );
        }

        // Update course itself
        const response = await Course.findOneAndUpdate(
            {
                CourseID: req.params.CourseID
            },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    duration: req.body.duration,
                    fee: req.body.fee,
                    mentor: newMentorID
                } },
            {
                new: true,
                runValidators: true
            }
        ).populate("mentor", "MentorID name email");

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: response
        });

    } catch (error) {

        console.log("UPDATE COURSE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= DELETE COURSE =================

const deleteCourses = async (req, res) => {
    try {

        // Find course first
        const course = await Course.findOne({
            CourseID: req.params.CourseID
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        /*
         * Remove CourseID from mentor
         *
         * Mentor:
         * courses: ["C001", "C002"]
         *
         * Delete C001
         *
         * Mentor:
         * courses: ["C002"]
         */

        if (course.mentor) {

            await Mentor.findByIdAndUpdate(
                course.mentor,
                {
                    $pull: {
                        courses: course.CourseID
                    }
                }
            );

        }

        // Now delete the course
        await Course.findOneAndDelete({
            CourseID: req.params.CourseID
        });

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {

        console.log("DELETE COURSE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message
        });
    }
};


module.exports = {
    addCourse,
    getAllCourses,
    getCourses,
    updateCourses,
    deleteCourses
};