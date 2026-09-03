
import React, { useState, useEffect } from 'react'
import './course.css'
import './button.css'

const Courses = () => {

    const [course, setCourse] = useState({
        CourseID: "",
        name: "",
        description: "",
        duration: "",
        fee: "",
        mentor: ""
    })

    const [courses, setCourses] = useState([])
    const [mentors, setMentors] = useState([])

    const [addCourse, setaddCourse] = useState(false)
    const [deleteCourseBox, setdeleteCourseBox] = useState(false)
    const [viewCourse, setviewCourse] = useState(false)
    const [editCourse, seteditCourse] = useState(false)
    const [deleteCourse, setdeleteCourse] = useState(false)

    const closeAllSections = () => {
        setaddCourse(false)
        setviewCourse(false)
        seteditCourse(false)
        setdeleteCourse(false)
        setdeleteCourseBox(false)
    }

    const resetCourse = () => {
        setCourse({
            CourseID: "",
            name: "",
            description: "",
            duration: "",
            fee: "",
            mentor: ""
        })
    }

    const handleChange = (e) => {
        try {
            setCourse({
                ...course,
                [e.target.name]: e.target.value
            })
        } catch (e) {
            console.log(e)
        }
    }

    const searchForCourseID = async () => {
        try {
            console.log("Course ID:", course.CourseID)

            const url =
                `${import.meta.env.VITE_API_URL}/api/courses/${course.CourseID}`

            const response = await fetch(url)

            const text = await response.text()

            console.log("Server response:", text)

            if (!response.ok) {
                throw new Error(
                    `Server returned ${response.status}: ${text}`
                )
            }

            const data = JSON.parse(text)

            setCourse({
                CourseID: data.CourseID,
                name: data.name,
                description: data.description,
                duration: data.duration,
                fee: data.fee,
                mentor: data.mentor?._id || data.mentor || ""
            })

        } catch (e) {
            console.log("Search error:", e)
            alert(e.message)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/courses/` +
                course.CourseID,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(course)
                }
            )

            if (!response.ok) {
                console.log("failed to update course")
                return
            }

            console.log("course updated successfully")

            alert("Course updated successfully!")

            resetCourse()
            seteditCourse(false)

        } catch (e) {
            console.log(e)
        }
    }

    const getAllCourses = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/courses`
            )

            if (!response.ok) {
                throw new Error("Failed to fetch courses")
            }

            const data = await response.json()

            setCourses(data)

        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Course:", course)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/courses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(course)
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add course"
                )
            }

            console.log("Course added:", data)

            alert("Course added successfully!")

            resetCourse()
            setaddCourse(false)

        } catch (error) {
            console.error("Error adding course:", error)
            alert(error.message)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this course?"
            )

            if (!confirmDelete) return

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/courses/` +
                course.CourseID,
                {
                    method: "DELETE"
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete course"
                )
            }

            alert("Successfully deleted")

            setdeleteCourseBox(false)
            setdeleteCourse(false)

            resetCourse()

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        const fetchMentors = async () => {

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/mentors`
                )

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch mentors"
                    )
                }

                const data = await response.json()

                setMentors(data)

            } catch (e) {
                console.log(
                    e + " error in fetching mentors"
                )
            }
        }

        fetchMentors()

    }, [])

    return (
        <>
            <div className="course-page">

                <div className="course-actions">

                    <div
                        className="course-action-card"
                        onClick={() => {
                            closeAllSections()
                            getAllCourses()
                            setviewCourse(true)
                        }}
                    >
                        <span className="course-action-icon">
                            📚
                        </span>

                        <span className="course-action-title">
                            All Courses
                        </span>

                        <span className="course-action-description">
                            View all available courses
                        </span>
                    </div>


                    <div
                        className="course-action-card"
                        onClick={() => {
                            closeAllSections()
                            resetCourse()
                            setaddCourse(true)
                        }}
                    >
                        <span className="course-action-icon">
                            ➕
                        </span>

                        <span className="course-action-title">
                            Add Course
                        </span>

                        <span className="course-action-description">
                            Add a new course
                        </span>
                    </div>


                    <div
                        className="course-action-card"
                        onClick={() => {
                            closeAllSections()
                            resetCourse()
                            seteditCourse(true)
                        }}
                    >
                        <span className="course-action-icon">
                            ✏️
                        </span>

                        <span className="course-action-title">
                            Edit Course
                        </span>

                        <span className="course-action-description">
                            Update course information
                        </span>
                    </div>


                    <div
                        className="course-action-card"
                        onClick={() => {
                            closeAllSections()
                            resetCourse()
                            setdeleteCourse(true)
                        }}
                    >
                        <span className="course-action-icon">
                            🗑️
                        </span>

                        <span className="course-action-title">
                            Delete Course
                        </span>

                        <span className="course-action-description">
                            Remove a course
                        </span>
                    </div>

                </div>


                {addCourse && (

                    <form
                        className="course-form"
                        onSubmit={handleSubmit}
                    >

                        <h2 className="course-form-title">
                            Add Course
                        </h2>

                        <input
                            type="text"
                            name="CourseID"
                            placeholder="Enter Course ID"
                            value={course.CourseID}
                            onChange={handleChange}
                            className="InputContainer input"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter Course Name"
                            name="name"
                            value={course.name}
                            onChange={handleChange}
                            className="InputContainer input"
                            required
                        />

                        <select
                            name="mentor"
                            className="InputContainer input"
                            value={course.mentor}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Mentor
                            </option>

                            {mentors.map((mentor) => (
                                <option
                                    key={mentor._id}
                                    value={mentor._id}
                                >
                                    {mentor.name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            placeholder="Enter description"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            className="InputContainer input"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter duration of course"
                            name="duration"
                            value={course.duration}
                            onChange={handleChange}
                            className="InputContainer input"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Enter course fee"
                            name="fee"
                            value={course.fee}
                            onChange={handleChange}
                            className="InputContainer input"
                            required
                        />

                        <div className="course-form-buttons">

                            <button
                                type="submit"
                                className="button-72"
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                className="button-82-pushable button-82-shadow button-82-edge button-82-front"
                                onClick={() => {
                                    setaddCourse(false)
                                    resetCourse()
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </form>
                )}


                {viewCourse && (

                    <div className="course-list-container">

                        <h2 className="course-form-title">
                            All Courses
                        </h2>

                        <div className="course-list">

                            {courses.map((course, index) => (

                                <div
                                    key={course._id || index}
                                    className="course-list-card"
                                >

                                    <div className="course-name">
                                        {course.name}
                                    </div>

                                    <div>
                                        {course.description}
                                    </div>

                                    <div>
                                        {course.duration}
                                    </div>

                                    <div className="course-fee">
                                        ₹{course.fee}
                                    </div>

                                    <div className="course-mentor">
                                        {course.mentor?.name ||
                                            "No mentor assigned"}
                                    </div>

                                </div>

                            ))}

                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setviewCourse(false)
                                setCourses([])
                            }}
                            className="button-82-pushable button-82-shadow button-82-edge button-82-front"
                        >
                            Close
                        </button>

                    </div>

                )}


                {editCourse && (

                    <form
                        onSubmit={handleUpdate}
                        className="course-form"
                    >

                        <h2 className="course-form-title">
                            Update Course
                        </h2>

                        <div className="course-search-row">

                            <input
                                type="text"
                                name="CourseID"
                                value={course.CourseID}
                                onChange={handleChange}
                                placeholder="Enter Course ID for search"
                                className="InputContainer input"
                            />

                            <button
                                type="button"
                                className="button-41"
                                onClick={searchForCourseID}
                            >
                                Search
                            </button>

                        </div>

                        <input
                            className="InputContainer input"
                            placeholder="Update name"
                            name="name"
                            value={course.name}
                            onChange={handleChange}
                        />

                        <textarea
                            className="InputContainer input"
                            placeholder="Update description"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                        />

                        <select
                            className="InputContainer input"
                            name="mentor"
                            value={course.mentor}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select Mentor
                            </option>

                            {mentors.map((mentor) => (
                                <option
                                    key={mentor._id}
                                    value={mentor._id}
                                >
                                    {mentor.name}
                                </option>
                            ))}

                        </select>

                        <input
                            type="text"
                            name="duration"
                            value={course.duration}
                            onChange={handleChange}
                            placeholder="Update duration"
                            className="InputContainer input"
                        />

                        <input
                            className="InputContainer input"
                            name="fee"
                            value={course.fee}
                            placeholder="Update course fee"
                            onChange={handleChange}
                        />

                        <div className="course-form-buttons">

                            <button
                                type="submit"
                                className="button-72"
                            >
                                Update Course
                            </button>

                            <button
                                type="button"
                                className="button-82-pushable button-82-shadow button-82-edge button-82-front"
                                onClick={() => {
                                    seteditCourse(false)
                                    resetCourse()
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </form>
                )}


                {deleteCourse && (

                    <form
                        onSubmit={handleDelete}
                        className="course-form"
                    >

                        <h2 className="course-form-title">
                            Delete Course
                        </h2>

                        <div className="course-search-row">

                            <input
                                type="text"
                                name="CourseID"
                                value={course.CourseID}
                                onChange={handleChange}
                                placeholder="Enter Course ID for search"
                                className="InputContainer input"
                            />

                            <button
                                type="button"
                                className="button-41"
                                onClick={async () => {
                                    await searchForCourseID()
                                    setdeleteCourseBox(true)
                                }}
                            >
                                Search
                            </button>

                        </div>


                        {deleteCourseBox && (

                            <div className="course-delete-card">

                                <div className="course-delete-header">

                                    <div>

                                        <h2>
                                            {course.name}
                                        </h2>

                                        <p>
                                            Course ID: {course.CourseID}
                                        </p>

                                    </div>

                                    <div className="course-delete-fee">
                                        ₹{course.fee}
                                    </div>

                                </div>


                                <div className="course-delete-description">

                                    <p>
                                        Description
                                    </p>

                                    <span>
                                        {course.description}
                                    </span>

                                </div>


                                <div className="course-delete-details">

                                    <div>
                                        <p>
                                            Duration
                                        </p>

                                        <strong>
                                            {course.duration}
                                        </strong>
                                    </div>


                                    <div>
                                        <p>
                                            Mentor
                                        </p>

                                        <strong>
                                            {mentors.find(
                                                mentor =>
                                                    mentor._id ===
                                                    course.mentor
                                            )?.name ||
                                                "No mentor assigned"}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        )}


                        <div className="course-form-buttons">

                            <button
                                type="submit"
                                className="w-50 rounded text-white font-bold bg-red-600 p-2"
                            >
                                Delete Course
                            </button>

                            <button
                                type="button"
                                className="bg-blue-600 text-white font-bold p-2 w-30 rounded"
                                onClick={() => {
                                    setdeleteCourse(false)
                                    setdeleteCourseBox(false)
                                    resetCourse()
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </form>
                )}

            </div>
        </>
    )
}

export default Courses

