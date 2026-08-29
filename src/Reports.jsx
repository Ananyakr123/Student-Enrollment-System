
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Reports=()=>{
const [students,setStudents]=useState([]);
const [totalStudents,settotalStudents]=useState(0);
const [totalmentors,settotalMentors]=useState(0);
const [totalcourses,settotalCourses]=useState(0);
const [totalaverageFees,settotalaverageFees]=useState(0);
const [totalPages,settotalPages]=useState(0);
const [currentPage,setcurrentPage]=useState(1);
const [limit,setlimit]=useState(5);
const [studentView,setstudentView]=useState(false);

const updateCounter=()=>{
setcurrentPage(1)
settotalPages(0)
settotalPages(0)
}
useEffect(() => {
    const getNumericData = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/reports");

            if (!response.ok) {
                throw new Error("Error in fetching report data");
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
    return (<>
    
    <div className="w-full h-full ">
        <div className="w-full h-1/4 flex justify-around pt-3 bg-white border rounded-e-4xl p-5  shadow-mauve-400">
        <div className="w-60 h-15 rounded-2xl border p-2 bg-white flex justify-center items-center hover:bg-indigo-200 hover:text-indigo-600 hover:translate-y-2 hover:shadow-indigo-300 hover:shadow-2xl font-bold font-sans text-xl " >
            Overview </div>
            <div className="w-60 h-38 flex justify-between shadow-mauve-400 rounded-2xl border-b-2 p-17 bg-white font-bold font-sans text-xl " onClick={
                ()=>{
                    updateCounter()
                    setstudentView(true)
                  
                }
          
        
            } >
         <span>{totalStudents} </span> <span>Students</span> </div>
            <div className="w-60 h-38 shadow-mauve-400 rounded-2xl border-b-2 p-17 bg-white font-bold font-sans text-xl flex justify-between " >
            <span>{totalStudents}</span> <span>Mentors</span> </div>
            <div className="w-60 h-38 shadow-mauve-400 rounded-2xl border-b-2 p-17 bg-white font-bold font-sans text-xl flex justify-between " >
            <span>{totalStudents} </span> <span>Courses</span></div>
            </div>

            <div> <NavLink className="button-41" to="/">Dashboard</NavLink></div>
    </div>
    
    </>)
}
export default Reports;