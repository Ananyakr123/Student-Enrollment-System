import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mentor.css";
import "./tabs.css";

const Mentors = () => {
    const [addMentor, setaddMentor] = useState(false);
    const [deleteMentorBox, setdeleteMentorBox] = useState(false);
    const [viewMentor, setviewMentor] = useState(false);
    const [editMentor, seteditMentor] = useState(false);
    const [deleteMentor, setdeleteMentor] = useState(false);

    const [mentor, setMentor] = useState({
        MentorID: "",
        name: "",
        phone: "",
        email: "",
        highest_Education: "",
        experience: "",
        salary: "",
        courses: []
    });

    const [mentors, setMentors] = useState([]);

    const courses = [
        "B.Tech IT",
        "B.Tech CSE",
        "BCA",
        "MCA",
        "MBA"
    ];

    const closeAllForms = () => {
        setaddMentor(false);
        setdeleteMentorBox(false);
        setviewMentor(false);
        seteditMentor(false);
        setdeleteMentor(false);
    };

    const resetMentor = () => {
        setMentor({
            MentorID: "",
            name: "",
            phone: "",
            email: "",
            highest_Education: "",
            experience: "",
            salary: "",
            courses: []
        });
    };

    const handleChange = (e) => {
        setMentor({
            ...mentor,
            [e.target.name]: e.target.value
        });
    };

    const handleCourseSelect = (course) => {
        setMentor((prev) => {
            if (prev.courses.includes(course)) {
                return {
                    ...prev,
                    courses: prev.courses.filter(
                        (item) => item !== course
                    )
                };
            }

            return {
                ...prev,
                courses: [...prev.courses, course]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5001/api/mentors",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(mentor)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Mentor added successfully!");

                resetMentor();
                setaddMentor(false);
            } else {
                alert(data.message || "Failed to add mentor");
            }
        } catch (e) {
            console.log(e);
            alert("Unable to connect to the backend");
        }
    };

    const getAllMentors = async () => {
        try {
            const response = await fetch(
                "http://localhost:5001/api/mentors"
            );

            const data = await response.json();

            if (response.ok) {
                setMentors(data.mentors || data);
                setviewMentor(true);
            } else {
                alert(data.message || "Unable to fetch mentors");
            }
        } catch (e) {
            console.log(e);
            alert("Something went wrong");
        }
    };

    const searchForMentorID = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5001/api/mentors/" +
                mentor.MentorID
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Mentor not found");
                return;
            }

            setMentor(data.mentor || data);
        } catch (e) {
            console.log(e);
            alert("Something went wrong");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5001/api/mentors/" +
                mentor.MentorID,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(mentor)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Mentor updated successfully!");

                resetMentor();
                seteditMentor(false);
            } else {
                alert(data.message || "Failed to update mentor");
            }
        } catch (e) {
            console.log(e);
            alert("Unable to update mentor");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5001/api/mentors/" +
                mentor.MentorID,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Mentor deleted successfully");

                resetMentor();
                setdeleteMentor(false);
            } else {
                alert(data.message || "Mentor not found");
            }
        } catch (e) {
            console.log(e);
            alert("Unable to delete mentor");
        }
    };

    return (
        <>
            <div className="mentor-page">

                <div className="mentor-actions">

                    <div
                        className="mentor-action-card"
                        onClick={() => {
                            closeAllForms();
                            resetMentor();
                            setaddMentor(true);
                        }}
                    >
                        Add Mentor
                    </div>

                    <div
                        className="mentor-action-card"
                        onClick={() => {
                            closeAllForms();
                            resetMentor();
                            seteditMentor(true);
                        }}
                    >
                        Edit Mentor
                    </div>

                    <div
                        className="mentor-action-card"
                        onClick={() => {
                            closeAllForms();
                            resetMentor();
                            setdeleteMentor(true);
                        }}
                    >
                        Delete Mentor
                    </div>

                    <div
                        className="mentor-action-card"
                        onClick={() => {
                            closeAllForms();
                            resetMentor();
                            getAllMentors();
                        }}
                    >
                        View Mentors
                    </div>

                </div>


                {addMentor && (
                    <form
                        className="mentor-form"
                        onSubmit={handleSubmit}
                    >

                        <h2 className="mentorViewTitle">
                            Add Mentor
                        </h2>

                        <input
                            type="text"
                            name="MentorID"
                            placeholder="Enter Mentor ID"
                            className="InputContainer input"
                            value={mentor.MentorID}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Mentor Name"
                            className="InputContainer input"
                            value={mentor.name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter Mentor Phone No."
                            className="InputContainer input"
                            value={mentor.phone}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Mentor Email"
                            className="InputContainer input"
                            value={mentor.email}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="highest_Education"
                            placeholder="Highest Education"
                            className="InputContainer input"
                            value={mentor.highest_Education}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="experience"
                            placeholder="Experience"
                            className="InputContainer input"
                            value={mentor.experience}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="salary"
                            placeholder="Salary"
                            className="InputContainer input"
                            value={mentor.salary}
                            onChange={handleChange}
                        />

                        <div className="courseSelector">

                            <div className="courseSelectorTitle">
                                Select Courses
                            </div>

                            <div className="courseList">

                                {courses.map((course, index) => (

                                    <div
                                        key={index}
                                        className={
                                            mentor.courses.includes(course)
                                                ? "courseOption courseOptionSelected"
                                                : "courseOption"
                                        }
                                        onClick={() =>
                                            handleCourseSelect(course)
                                        }
                                    >

                                        <span>
                                            {course}
                                        </span>

                                        {mentor.courses.includes(course) && (
                                            <span>✓</span>
                                        )}

                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="flex gap-4 justify-center">

                            <button
                                type="submit"
                                className="button-72"
                            >
                                Add Mentor
                            </button>

                            <button
                                type="button"
                                className="button-24"
                                onClick={() => {
                                    setaddMentor(false);
                                    resetMentor();
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </form>
                )}


                {editMentor && (
                    <form
                        className="mentor-form"
                        onSubmit={handleUpdate}
                    >

                        <h2 className="mentorViewTitle">
                            Update Mentor
                        </h2>

                        <div className="flex gap-4 justify-center items-center w-full">

                            <input
                                type="text"
                                name="MentorID"
                                placeholder="Enter Mentor ID"
                                className="InputContainer input"
                                value={mentor.MentorID}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="button-41"
                                onClick={searchForMentorID}
                            >
                                Search
                            </button>

                        </div>

                        <input
                            type="text"
                            name="name"
                            placeholder="Update Mentor Name"
                            className="InputContainer input"
                            value={mentor.name}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Update Phone"
                            className="InputContainer input"
                            value={mentor.phone}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Update Email"
                            className="InputContainer input"
                            value={mentor.email}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="highest_Education"
                            placeholder="Update Education"
                            className="InputContainer input"
                            value={mentor.highest_Education}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="experience"
                            placeholder="Update Experience"
                            className="InputContainer input"
                            value={mentor.experience}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="salary"
                            placeholder="Update Salary"
                            className="InputContainer input"
                            value={mentor.salary}
                            onChange={handleChange}
                        />

                        <div className="courseSelector">

                            <div className="courseSelectorTitle">
                                Select Courses
                            </div>

                            <div className="courseList">

                                {courses.map((course, index) => (

                                    <div
                                        key={index}
                                        className={
                                            mentor.courses.includes(course)
                                                ? "courseOption courseOptionSelected"
                                                : "courseOption"
                                        }
                                        onClick={() =>
                                            handleCourseSelect(course)
                                        }
                                    >

                                        <span>
                                            {course}
                                        </span>

                                        {mentor.courses.includes(course) && (
                                            <span>✓</span>
                                        )}

                                    </div>

                                ))}

                            </div>

                        </div>

                        <div className="flex gap-4 justify-center">

                            <button
                                type="submit"
                                className="button-72"
                            >
                                Update Mentor
                            </button>

                            <button
                                type="button"
                                className="button-24"
                                onClick={() => {
                                    seteditMentor(false);
                                    resetMentor();
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </form>
                )}


                {deleteMentor && (
                    <form
                        className="mentor-form"
                        onSubmit={handleDelete}
                    >

                        <h2 className="mentorViewTitle">
                            Delete Mentor
                        </h2>

                        <div className="flex gap-4 justify-center items-center w-full">

                            <input
                                type="text"
                                name="MentorID"
                                placeholder="Enter Mentor ID"
                                className="InputContainer input"
                                value={mentor.MentorID}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="button-41"
                                onClick={searchForMentorID}
                            >
                                Search
                            </button>

                        </div>

                        <div className="mentor-delete-message">
                            Are you sure you want to delete record for{" "}
                            <strong>{mentor.name}</strong>?
                        </div>

                        <div className="flex gap-5 justify-center">

                            <button
                                type="submit"
                                className="button-24"
                            >
                                Delete
                            </button>

                            <button
                                type="button"
                                className="w-20 rounded bg-green-500 text-white font-bold "
                                onClick={() => {
                                    setdeleteMentor(false);
                                    resetMentor();
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                )}


                {viewMentor && (
                    <div className="mentorView">

                        <h2 className="mentorViewTitle">
                            All Mentors
                        </h2>

                        <div className="mentorGrid">

                            {mentors.map((mentorItem, index) => (

                                <div
                                    className="mentorTab"
                                    key={
                                        mentorItem.MentorID || index
                                    }
                                >

                                    <div className="mentorTabHeader">

                                        <span className="mentorName">
                                            {mentorItem.name}
                                        </span>

                                        <span className="mentorID">
                                            {mentorItem.MentorID}
                                        </span>

                                    </div>

                                    <div className="mentorTabInfo">

                                        <p>
                                            <strong>Phone:</strong>{" "}
                                            {mentorItem.phone}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {mentorItem.email}
                                        </p>

                                        <p>
                                            <strong>Education:</strong>{" "}
                                            {mentorItem.highest_Education}
                                        </p>

                                        <p>
                                            <strong>Experience:</strong>{" "}
                                            {mentorItem.experience}
                                        </p>

                                        <p>
                                            <strong>Salary:</strong>{" "}
                                            {mentorItem.salary}
                                        </p>

                                    </div>

                                    <div className="mentorTabCourses">

                                        {(mentorItem.courses || []).map(
                                            (course, courseIndex) => (

                                                <span
                                                    className="mentorCourseTag"
                                                    key={courseIndex}
                                                >
                                                    {course?.name || course}
                                                </span>

                                            )
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                )}


              

            </div>
        </>
    );
};

export default Mentors;