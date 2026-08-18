import react from 'react'
import useState from 'react'
const Courses=()=>{
const [course,setCourse]=useState({
    name:"",
    description:"",
    duration:"",
    fee:"",
    mentor:""
});
const [addCourse,setaddCourse]=useState(false);
const [viewCourse,setviewCourse]=useState(false);
const [editCourse,seteditCourse]=useState(false);
const [deleteCourse,setdeleteCourse]=useState(false);
const handleChange=(e)=>{
    try{
        setCourse({
            ...course,
            [e.target.name]:e.target.value}
        )
    }catch(e){
        console.log(e);
    }
};


return (
    <>
    <div className="w-screen h-screen m-2 p-10 pl-5 pr-5 border bg-mauve-50 rounded-lg ">
        <div className='w-full p-2 h-40 flex justify-around'>
          <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200">All Courses </div>
     <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200">Add a course </div>
    
    <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200">Edit a course </div>
    
    <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200">Delete a course </div>
    
    
        </div>
        {addStudent && 
    <form className="mt-4 w-2xl border-b border-gray-900/10 pb-10   h-max flex flex-col justify-center items-center gap-6 mb-5  p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
       
    <input type="text" placeholder="Enter Course Name"  name="name" className="InputContainer input"

value={course.name}
onChange={handleChange}/>
  
    <select name="course" className="InputContainer input"
value={course.mentor}
onChange={handleChange}>
<option value="">Select Course</option>

{courses.map((course, index) => (
<option key={index} value={course}>
  {course}
</option>
))}
</select>
   
    <input type="text" placeholder="Enter Student Phone No."  className="InputContainer input"
name="phone"
value={student.phone}
onChange={handleChange}
/>
    <input type="text" placeholder="Enter Student Email ID" name ="email" value={student.email} onChange={handleChange}  className="InputContainer input" />
    <input type="text" placeholder="Enter Student Roll No."  name="rollNo" value={student.rollNo} onChange={handleChange}   className="InputContainer input"/>
<div className="flex w-full justify-around p-4">
<button type="submit" className="button-72" >
submit
</button>
<button type="button"  onClick={()=>{
        setaddStudent(false);
        setStudent({
          name: "",
            phone: "",
            email: "",
            rollNo: "",
            course: ""
        })
    }}   className="button-82-pushable button-82-shadow button-82-edge button-82-front "> close </button>
    </div>
</form>

}
    </div>
    </>
)
}
export default Courses;