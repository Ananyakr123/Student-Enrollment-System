import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Users,
    UserRound,
    BookOpen,
    IndianRupee,
    BarChart3,
    ArrowRight
} from "lucide-react";
import "./report.css";

const Reports = () => {

    const [students, setStudents] = useState([]);
    const [totalStudents, settotalStudents] = useState(0);
    const [totalmentors, settotalMentors] = useState(0);
    const [totalcourses, settotalCourses] = useState(0);
    const [totalaverageFees, settotalaverageFees] = useState(0);
    const [totalPages, settotalPages] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [limit, setlimit] = useState(5);
    const [studentView, setstudentView] = useState(false);

    const updateCounter = () => {
        setcurrentPage(1);
        settotalPages(0);
    };

    useEffect(() => {

        const getNumericData = async () => {

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/reports`
                );

                if (!response.ok) {
                    throw new Error(
                        "Error in fetching report data"
                    );
                }

                const data = await response.json();

                settotalStudents(data.totalStudents);
                settotalMentors(data.totalMentors);
                settotalCourses(data.totalCourses);
                settotalaverageFees(data.averageCourseFee);

            } catch (e) {
                alert(e.message);
            }
        };

        getNumericData();

    }, []);

    return (
        <div className="reports-page">

            <div className="reports-header">

                <div>
                    <p className="reports-small-title">
                        ANALYTICS
                    </p>

                    <h1 className="reports-title">
                        Report Analysis
                    </h1>

                    <p className="reports-subtitle">
                        Overview of students, mentors and courses
                    </p>
                </div>

                <div className="reports-header-icon">
                    <BarChart3 size={38} />
                </div>

            </div>


            <div className="report-cards">

                <div
                    className="report-card students-card"
                    onClick={() => {
                        updateCounter();
                        setstudentView(true);
                    }}
                >

                    <div className="report-card-top">

                        <div className="report-icon">
                            <Users size={25} />
                        </div>

                        <ArrowRight
                            size={20}
                            className="report-arrow"
                        />

                    </div>

                    <div className="report-number">
                        {totalStudents}
                    </div>

                    <div className="report-label">
                        Total Students
                    </div>

                    <p className="report-description">
                        Registered students in the system
                    </p>

                </div>


                <div className="report-card mentors-card">

                    <div className="report-card-top">

                        <div className="report-icon">
                            <UserRound size={25} />
                        </div>

                        <ArrowRight
                            size={20}
                            className="report-arrow"
                        />

                    </div>

                    <div className="report-number">
                        {totalmentors}
                    </div>

                    <div className="report-label">
                        Total Mentors
                    </div>

                    <p className="report-description">
                        Mentors currently available
                    </p>

                </div>


                <div className="report-card courses-card">

                    <div className="report-card-top">

                        <div className="report-icon">
                            <BookOpen size={25} />
                        </div>

                        <ArrowRight
                            size={20}
                            className="report-arrow"
                        />

                    </div>

                    <div className="report-number">
                        {totalcourses}
                    </div>

                    <div className="report-label">
                        Total Courses
                    </div>

                    <p className="report-description">
                        Courses available for enrollment
                    </p>

                </div>


                <div className="report-card fees-card">

                    <div className="report-card-top">

                        <div className="report-icon">
                            <IndianRupee size={25} />
                        </div>

                        <ArrowRight
                            size={20}
                            className="report-arrow"
                        />

                    </div>

                    <div className="report-number">
                        ₹{Number(totalaverageFees).toLocaleString()}
                    </div>

                    <div className="report-label">
                        Average Course Fee
                    </div>

                    <p className="report-description">
                        Average fee across all courses
                    </p>

                </div>

            </div>


            {studentView && (

                <div className="report-detail-panel">

                    <div className="detail-panel-header">

                        <div>
                            <p className="reports-small-title">
                                STUDENT DATA
                            </p>

                            <h2>
                                Student Overview
                            </h2>
                        </div>

                        <button
                            className="detail-close"
                            onClick={() => {
                                setstudentView(false);
                            }}
                        >
                            Close
                        </button>

                    </div>

                    <div className="student-summary">

                        <div>
                            <Users size={22} />

                            <span>
                                Total Students
                            </span>

                            <strong>
                                {totalStudents}
                            </strong>
                        </div>

                    </div>

                </div>

            )}


            <NavLink
                className="reports-dashboard-button"
                to="/dashboard"
            >
                <span>Back to Dashboard</span>
                <ArrowRight size={18} />
            </NavLink>

        </div>
    );
};

export default Reports;