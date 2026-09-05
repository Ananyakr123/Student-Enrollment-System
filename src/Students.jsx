import { useState } from "react";

import { NavLink } from "react-router-dom";
import {
    Users,
    UserPlus,
    Search,
    Pencil,
    Trash2,
    Eye,
    X,
    ArrowLeft
} from "lucide-react";
import "./button.css";
import "./student.css";

const Students = () => {
    const [addStudent, setaddStudent] = useState(false);
    const [deleteStudent, setdeleteStudent] = useState(false);
    const [viewStudent, setviewStudent] = useState(false);
    const [updateStudent, setupdateStudent] = useState(false);

    const [student, setStudent] = useState({
        name: "",
        phone: "",
        email: "",
        rollNo: "",
        course: ""
    });

    const courses = [
        "B.Tech IT",
        "B.Tech CSE",
        "BCA",
        "MCA",
        "MBA"
    ];

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const resetStudent = () => {
        setStudent({
            name: "",
            phone: "",
            email: "",
            rollNo: "",
            course: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(student)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Student added successfully!");

                resetStudent();
            } else {
                alert(data.message || "Failed to add student");
            }
        } catch (e) {
            console.log(e);
            alert("Unable to connect to the backend");
        }
    };

    const searchForRoll = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/roll/` +
                student.rollNo
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Student not found");
                return;
            }

            setStudent(data);
        } catch (e) {
            console.log(e);
            alert("Something went wrong");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/roll/` +
                student.rollNo,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(student)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Student updated successfully!");
                resetStudent();
            } else {
                alert(data.message || "Failed to update");
            }
        } catch (e) {
            console.log(e);
            alert("Unable to update");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/students/roll/` +
                student.rollNo,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Student deleted successfully");
                resetStudent();
            } else {
                alert(data.message || "Student not found");
            }
        } catch (e) {
            console.log(e);
            alert("Unable to delete student");
        }
    };

    const closeAll = () => {
        setaddStudent(false);
        setupdateStudent(false);
        setdeleteStudent(false);
        setviewStudent(false);
        resetStudent();
    };

    return (
        <div className="studentPage">

            <div className="studentHeading">
                <div className="studentHeadingIcon">
                    <Users size={30} />
                </div>

                <div>
                    <h1>Student Management</h1>
                    <p>
                        Add, update, view and manage student records
                    </p>
                </div>
            </div>

            <div className="studentActions">

                <div
                    className="studentActionCard"
                    onClick={() => {
                        closeAll();
                        setaddStudent(true);
                    }}
                >
                    <div className="studentActionIcon addIcon">
                        <UserPlus size={26} />
                    </div>

                    <div className="studentActionText">
                        <h3>Add Student</h3>
                        <p>Create a new student record</p>
                    </div>

                    <ArrowLeft className="studentActionArrow" size={20} />
                </div>

                <div
                    className="studentActionCard"
                    onClick={() => {
                        closeAll();
                        setupdateStudent(true);
                    }}
                >
                    <div className="studentActionIcon updateIcon">
                        <Pencil size={26} />
                    </div>

                    <div className="studentActionText">
                        <h3>Update Student</h3>
                        <p>Edit existing student data</p>
                    </div>

                    <ArrowLeft className="studentActionArrow" size={20} />
                </div>

                <div
                    className="studentActionCard"
                    onClick={() => {
                        closeAll();
                        setdeleteStudent(true);
                    }}
                >
                    <div className="studentActionIcon deleteIcon">
                        <Trash2 size={26} />
                    </div>

                    <div className="studentActionText">
                        <h3>Delete Student</h3>
                        <p>Remove a student record</p>
                    </div>

                    <ArrowLeft className="studentActionArrow" size={20} />
                </div>

                <div
                    className="studentActionCard"
                    onClick={() => {
                        closeAll();
                        setviewStudent(true);
                    }}
                >
                    <div className="studentActionIcon viewIcon">
                        <Eye size={26} />
                    </div>

                    <div className="studentActionText">
                        <h3>View Student</h3>
                        <p>View student information</p>
                    </div>

                    <ArrowLeft className="studentActionArrow" size={20} />
                </div>

            </div>

            {addStudent && (
                <form
                    className="studentForm"
                    onSubmit={handleSubmit}
                >
                    <div className="formHeading">
                        <div className="formHeadingIcon addIcon">
                            <UserPlus size={22} />
                        </div>

                        <div>
                            <h2>Add Student</h2>
                            <p>Enter the student's information</p>
                        </div>
                    </div>

                    <div className="studentInputGroup">
                        <label>Student Name</label>

                        <input
                            type="text"
                            placeholder="Enter student name"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            className="studentInput"
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Course</label>

                        <select
                            name="course"
                            value={student.course}
                            onChange={handleChange}
                            className="studentInput"
                        >
                            <option value="">
                                Select Course
                            </option>

                            {courses.map((course, index) => (
                                <option
                                    key={index}
                                    value={course}
                                >
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="studentInputGroup">
                        <label>Phone Number</label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            name="phone"
                            value={student.phone}
                            onChange={handleChange}
                            className="studentInput"
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Email</label>

                        <input
                            type="text"
                            placeholder="Enter email address"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            className="studentInput"
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Roll Number</label>

                        <input
                            type="text"
                            placeholder="Enter roll number"
                            name="rollNo"
                            value={student.rollNo}
                            onChange={handleChange}
                            className="studentInput"
                        />
                    </div>

                    <div className="studentFormButtons">

                        <button
                            type="submit"
                            className="studentPrimaryButton"
                        >
                            <UserPlus size={17} />
                            Add Student
                        </button>

                        <button
                            type="button"
                            className="studentSecondaryButton"
                            onClick={closeAll}
                        >
                            <X size={17} />
                            Close
                        </button>

                    </div>

                </form>
            )}

            {updateStudent && (
                <form
                    className="studentForm"
                    onSubmit={handleUpdate}
                >
                    <div className="formHeading">
                        <div className="formHeadingIcon updateIcon">
                            <Pencil size={22} />
                        </div>

                        <div>
                            <h2>Update Student</h2>
                            <p>Search and update student information</p>
                        </div>
                    </div>

                    <div className="studentSearchRow">

                        <input
                            type="text"
                            name="rollNo"
                            value={student.rollNo}
                            onChange={handleChange}
                            placeholder="Enter roll number"
                            className="studentInput"
                        />

                        <button
                            type="button"
                            className="studentSearchButton"
                            onClick={searchForRoll}
                        >
                            <Search size={17} />
                            Search
                        </button>

                    </div>

                    <div className="studentInputGroup">
                        <label>Student Name</label>

                        <input
                            className="studentInput"
                            placeholder="Update name"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Email</label>

                        <input
                            className="studentInput"
                            placeholder="Update email"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Roll Number</label>

                        <input
                            type="text"
                            name="rollNo"
                            value={student.rollNo}
                            readOnly
                            className="studentInput studentReadonly"
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Phone Number</label>

                        <input
                            className="studentInput"
                            name="phone"
                            value={student.phone}
                            placeholder="Update phone"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="studentInputGroup">
                        <label>Course</label>

                        <select
                            className="studentInput"
                            name="course"
                            value={student.course}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select Course
                            </option>

                            {courses.map((course, index) => (
                                <option
                                    key={index}
                                    value={course}
                                >
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="studentFormButtons">

                        <button
                            type="submit"
                            className="studentPrimaryButton"
                        >
                            <Pencil size={17} />
                            Update Student
                        </button>

                        <button
                            type="button"
                            className="studentSecondaryButton"
                            onClick={closeAll}
                        >
                            <X size={17} />
                            Close
                        </button>

                    </div>

                </form>
            )}

            {viewStudent && (
                <form className="studentForm">

                    <div className="formHeading">
                        <div className="formHeadingIcon viewIcon">
                            <Eye size={22} />
                        </div>

                        <div>
                            <h2>View Student</h2>
                            <p>Search for a student's information</p>
                        </div>
                    </div>

                    <div className="studentSearchRow">

                        <input
                            type="text"
                            name="rollNo"
                            value={student.rollNo}
                            onChange={handleChange}
                            placeholder="Enter roll number"
                            className="studentInput"
                        />

                        <button
                            type="button"
                            className="studentSearchButton"
                            onClick={searchForRoll}
                        >
                            <Search size={17} />
                            Search
                        </button>

                    </div>

                    <div className="studentDetails">

                        <div className="studentDetailItem">
                            <span>Student Name</span>
                            <strong>{student.name || "—"}</strong>
                        </div>

                        <div className="studentDetailItem">
                            <span>Roll Number</span>
                            <strong>{student.rollNo || "—"}</strong>
                        </div>

                        <div className="studentDetailItem">
                            <span>Email</span>
                            <strong>{student.email || "—"}</strong>
                        </div>

                        <div className="studentDetailItem">
                            <span>Phone</span>
                            <strong>{student.phone || "—"}</strong>
                        </div>

                        <div className="studentDetailItem">
                            <span>Course</span>
                            <strong>{student.course || "—"}</strong>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="studentSecondaryButton"
                        onClick={closeAll}
                    >
                        <X size={17} />
                        Close
                    </button>

                </form>
            )}

            {deleteStudent && (
                <form
                    className="studentForm"
                    onSubmit={handleDelete}
                >

                    <div className="formHeading">
                        <div className="formHeadingIcon deleteIcon">
                            <Trash2 size={22} />
                        </div>

                        <div>
                            <h2>Delete Student</h2>
                            <p>Search for the record you want to remove</p>
                        </div>
                    </div>

                    <div className="studentSearchRow">

                        <input
                            type="text"
                            name="rollNo"
                            value={student.rollNo}
                            onChange={handleChange}
                            placeholder="Enter roll number"
                            className="studentInput"
                        />

                        <button
                            type="button"
                            className="studentSearchButton"
                            onClick={searchForRoll}
                        >
                            <Search size={17} />
                            Search
                        </button>

                    </div>

                    <div className="deleteConfirmation">

                        <div className="deleteConfirmationIcon">
                            <Trash2 size={25} />
                        </div>

                        <h3>
                            Are you sure?
                        </h3>

                        <p>
                            You are about to delete the record for
                        </p>

                        <strong>
                            {student.name || "this student"}
                        </strong>

                    </div>

                    <div className="studentFormButtons">

                        <button
                            type="submit"
                            className="studentDeleteButton"
                        >
                            <Trash2 size={17} />
                            Delete Student
                        </button>

                        <button
                            type="button"
                            className="studentSecondaryButton"
                            onClick={closeAll}
                        >
                            <X size={17} />
                            Cancel
                        </button>

                    </div>

                </form>
            )}

            <NavLink
                to="/dashboard"
                className="studentBackDashboard"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </NavLink>

        </div>
    );
};

export default Students;