const Student = require("../models/Student");


// ADD STUDENT
const addStudent = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            rollNo,
            course
        } = req.body;

        const student = await Student.create({
            name,
            phone,
            email,
            rollNo,
            course
        });

        return res.status(201).json({
            success: true,
            message: "Student added successfully",
            student
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET STUDENT BY ROLL NO
const getStudentByRollNo = async (req, res) => {
    try {
        const student = await Student.findOne({
            rollNo: req.params.rollNo
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json(student);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE STUDENT
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            {
                rollNo: req.params.rollNo
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });

    } catch (error) {
        console.log("UPDATE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Error updating student",
            error: error.message
        });
    }
};


// DELETE STUDENT
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            rollNo: req.params.rollNo
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            student
        });

    } catch (error) {
        console.log("DELETE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Error deleting student",
            error: error.message
        });
    }
};


module.exports = {
    addStudent,
    getStudentByRollNo,
    updateStudent,
    deleteStudent
};