import { useState, useEffect } from "react";
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

    // Courses are now fetched from backend
    const [courses, setCourses] = useState([]);


    // --------------------------------------------------
    // FETCH COURSES
    // --------------------------------------------------

    const fetchCourses = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/courses`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }

            const data = await response.json();

            setCourses(data);

        } catch (error) {

            console.log("Error fetching courses:", error);

            setCourses([]);
        }
    };


    // Fetch courses when Mentor component loads
    useEffect(() => {
        fetchCourses();
    }, []);


    // --------------------------------------------------
    // CLOSE ALL FORMS
    // --------------------------------------------------

    const closeAllForms = () => {

        setaddMentor(false);
        setdeleteMentorBox(false);
        setviewMentor(false);
        seteditMentor(false);
        setdeleteMentor(false);

    };


    // --------------------------------------------------
    // RESET MENTOR
    // --------------------------------------------------

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


    // --------------------------------------------------
    // HANDLE INPUT CHANGE
    // --------------------------------------------------

    const handleChange = (e) => {

        setMentor({
            ...mentor,
            [e.target.name]: e.target.value
        });

    };


    // --------------------------------------------------
    // SELECT / UNSELECT COURSE
    // --------------------------------------------------

    const handleCourseSelect = (courseID) => {

        setMentor((prev) => {

            if (prev.courses.includes(courseID)) {

                return {
                    ...prev,
                    courses: prev.courses.filter(
                        (item) => item !== courseID
                    )
                };

            }

            return {
                ...prev,
                courses: [...prev.courses, courseID]
            };

        });

    };


    // --------------------------------------------------
    // ADD MENTOR
    // --------------------------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/mentors`,
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

                alert(
                    data.message ||
                    "Failed to add mentor"
                );

            }

        } catch (e) {

            console.log(e);

            alert(
                "Unable to connect to the backend"
            );

        }

    };


    // --------------------------------------------------
    // GET ALL MENTORS
    // --------------------------------------------------

    const getAllMentors = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/mentors`
            );

            const data = await response.json();

            if (response.ok) {

                setMentors(
                    data.mentors || data
                );

                setviewMentor(true);

            } else {

                alert(
                    data.message ||
                    "Unable to fetch mentors"
                );

            }

        } catch (e) {

            console.log(e);

            alert(
                "Something went wrong"
            );

        }

    };


    // --------------------------------------------------
    // SEARCH MENTOR
    // --------------------------------------------------

    const searchForMentorID = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/mentors/` +
                mentor.MentorID
            );

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message ||
                    "Mentor not found"
                );

                return;

            }

            const foundMentor =
                data.mentor || data;

            setMentor({
                ...foundMentor,

                // Make sure courses is always an array
                courses: foundMentor.courses || []
            });

        } catch (e) {

            console.log(e);

            alert(
                "Something went wrong"
            );

        }

    };


    // --------------------------------------------------
    // UPDATE MENTOR
    // --------------------------------------------------

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/mentors/` +
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

                alert(
                    "Mentor updated successfully!"
                );

                resetMentor();
                seteditMentor(false);

            } else {

                alert(
                    data.message ||
                    "Failed to update mentor"
                );

            }

        } catch (e) {

            console.log(e);

            alert(
                "Unable to update mentor"
            );

        }

    };


    // --------------------------------------------------
    // DELETE MENTOR
    // --------------------------------------------------

    const handleDelete = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/mentors/` +
                mentor.MentorID,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert(
                    "Mentor deleted successfully"
                );

                resetMentor();
                setdeleteMentor(false);

            } else {

                alert(
                    data.message ||
                    "Mentor not found"
                );

            }

        } catch (e) {

            console.log(e);

            alert(
                "Unable to delete mentor"
            );

        }

    };


    // --------------------------------------------------
    // COURSE SELECTOR UI
    // --------------------------------------------------

    const courseSelector = (

        <div className="courseSelector">

            <div className="courseSelectorTitle">
                Select Courses
            </div>

            <div className="courseList">

                {courses.length > 0 ? (

                    courses.map((course) => (

                        <div
                            key={course._id}
                            className={
                                mentor.courses.includes(
                                    course.CourseID
                                )
                                    ? "courseOption courseOptionSelected"
                                    : "courseOption"
                            }
                            onClick={() =>
                                handleCourseSelect(
                                    course.CourseID
                                )
                            }
                        >

                            <span>
                                {course.name}
                            </span>

                            {mentor.courses.includes(
                                course.CourseID
                            ) && (
                                <span>
                                    ✓
                                </span>
                            )}

                        </div>

                    ))

                ) : (

                    <p className="text-gray-500">
                        No courses available
                    </p>

                )}

            </div>

        </div>

    );


    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (

        <>

            <div className="mentor-page">

                <div className="mentor-actions">


                    {/* ADD MENTOR */}

                    <div
                        className="mentor-action-card"
                        onClick={() => {

                            closeAllForms();
                            resetMentor();

                            // Refresh courses before opening
                            fetchCourses();

                            setaddMentor(true);

                        }}
                    >
                        Add Mentor
                    </div>


                    {/* EDIT MENTOR */}

                    <div
                        className="mentor-action-card"
                        onClick={() => {

                            closeAllForms();
                            resetMentor();

                            // Refresh courses before opening
                            fetchCourses();

                            seteditMentor(true);

                        }}
                    >
                        Edit Mentor
                    </div>


                    {/* DELETE MENTOR */}

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


                    {/* VIEW MENTORS */}

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


                {/* =========================================
                    ADD MENTOR
                ========================================= */}

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


                        {courseSelector}


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


                {/* =========================================
                    EDIT MENTOR
                ========================================= */}

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


                        {courseSelector}


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


                {/* =========================================
                    DELETE MENTOR
                ========================================= */}

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

                            <strong>
                                {mentor.name}
                            </strong>?

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
                                className="w-20 rounded bg-green-500 text-white font-bold"
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


                {/* =========================================
                    VIEW MENTORS
                ========================================= */}

                {viewMentor && (

                    <div className="mentorView">

                        <h2 className="mentorViewTitle">
                            All Mentors
                        </h2>


                        <div className="mentorGrid">

                            {mentors.map(
                                (mentorItem, index) => (

                                    <div
                                        className="mentorTab"
                                        key={
                                            mentorItem.MentorID ||
                                            index
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
                                                <strong>
                                                    Phone:
                                                </strong>{" "}
                                                {mentorItem.phone}
                                            </p>


                                            <p>
                                                <strong>
                                                    Email:
                                                </strong>{" "}
                                                {mentorItem.email}
                                            </p>


                                            <p>
                                                <strong>
                                                    Education:
                                                </strong>{" "}
                                                {mentorItem.highest_Education}
                                            </p>


                                            <p>
                                                <strong>
                                                    Experience:
                                                </strong>{" "}
                                                {mentorItem.experience}
                                            </p>


                                            <p>
                                                <strong>
                                                    Salary:
                                                </strong>{" "}
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

                                                        {course?.name ||
                                                            course}

                                                    </span>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                )}

            </div>

        </>

    );
};

export default Mentors;