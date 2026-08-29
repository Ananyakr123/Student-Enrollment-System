import react ,{ useState,useEffect } from 'react'
import './tabs.css'
import './button.css'

const Courses=()=>{
const [course,setCourse]=useState({
  CourseID:"",
    name:"",
    description:"",
    duration:"",
    fee:"",
    mentor:""
});
const [courses, setCourses] = useState([]);
const [mentors, setMentors] = useState([]);
const [addCourse,setaddCourse]=useState(false);
const [deleteCourseBox,setdeleteCourseBox]=useState(false);
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
    } }
    const searchForCourseID = async () => {
      try {
          console.log("Course ID:", course.CourseID);
  
          const url = `http://localhost:5001/api/courses/${course.CourseID}`;
  
        
  
          const response = await fetch(url);
  
         
  
          const text = await response.text();
  
          console.log("Server response:", text);
  
          if (!response.ok) {
              throw new Error(`Server returned ${response.status}: ${text}`);
          }
  
          const data = JSON.parse(text);
  
          setCourse({
              CourseID: data.CourseID,
              name: data.name,
              description: data.description,
              duration: data.duration,
              fee: data.fee,
              mentor: data.mentor?._id || data.mentor || ""
          });
          
  
      } catch (e) {
          console.log("Search error:", e);
          alert(e.message);
      }
  };
  const  handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:5001/api/courses/"+course.CourseID,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            
          },
          body:JSON.stringify(course)
        }
      );
      if(!response.ok){
        console.log("failed to update course");
      }
      console.log("course updated successfully");
      setCourse({
        CourseID:"",
name:"",
description:"",
duration:"",
fee:"",
mentor:""
      })
    }catch(e){
      console.log(e);
    }
  }

const getAllCourses=async()=>{
    try{
        const response=await fetch("http://localhost:5001/api/courses");
        if(!response.ok){
            throw new Error("Failed to fetch courses");
        }
        const data=await response.json();
        setCourses(data);
    }catch(e){
        console.log(e);
    }
}
const handleSubmit =async (e) => {
    e.preventDefault();

    console.log("Course:", course);
    try{
        const response= await fetch("http://localhost:5001/api/courses",{
            method:"POST",
            headers:{
          "Content-Type":"application/json"
            },
            body:JSON.stringify(course)
        })
      
        const data=await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to add course");
          }
          console.log("Course added:", data);

    alert("Course added successfully!");
    
   
    setCourse({
      CourseID: "",
      name: "",
      description: "",
      duration: "",
      fee: "",
      mentor: "",
    });
    setaddCourse(false);
    }catch (error) {
        console.error("Error adding course:", error);
    
        alert(error.message);
      }
};
const handleDelete=async(e)=>{
  try{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;
const response = await fetch("http://localhost:5001/api/courses/"+course.CourseID, {
  method:"DELETE",
 
});
const data = await response.json();
if(!response.ok){
  throw new Error(data.message || "Failed to delete course");
}

  alert("successfully deleted");
  setdeleteCourseBox(false);

  setCourse({
    CourseID: "",
    name: "",
    description: "",
    duration: "",
    fee: "",
    mentor: ""
  });

  }catch(e){
console.log(e);
  }
}

useEffect(()=>{
    const fetchMentors=async()=>{
        try{
            const response=await fetch("http://localhost:5001/api/mentors");
            if (!response.ok) {
                throw new Error("Failed to fetch mentors");
              }
            const data =await response.json();
            setMentors(data);

        }catch(e){
            console.log(e+"error in fetching mentors");
        }
    };
    fetchMentors();
},[])
return (
    <>
    <div className="w-screen h-screen m-2 p-10 pl-5 pr-5  ">
        <div className='w-full p-2 h-40 flex justify-around'>
          <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200" 
          onClick={
            ()=>{
                setaddCourse(false);
                getAllCourses();
                setviewCourse(true);
                seteditCourse(false);
                setdeleteCourse(false);
            }}>All Courses </div>
     <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200"  onClick={
            ()=>{
                setaddCourse(true);
                setviewCourse(false);
                seteditCourse(false);
                setdeleteCourse(false);
            }
          }>Add a course </div>
    
    <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200"     onClick={
            ()=>{
                setaddCourse(false);

                setviewCourse(false);
                seteditCourse(true);
                setdeleteCourse(false);
            }}
          >Edit a course </div>
    
    <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200" onClick={
            ()=>{
                setaddCourse(false);

                setviewCourse(false);
                seteditCourse(false);
                setdeleteCourse(true);
            }}
           > Delete a course </div>
    
    
        </div>
        {addCourse && 
    <form className="mt-4 w-2xl border-b border-gray-900/10 pb-10   h-max flex flex-col justify-center items-center gap-6 mb-5  p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <input type="text" name="CourseID" placeholder="Enter Course ID" value={course.CourseID}
    onChange={handleChange} className="InputContainer input"/>

    <input type="text" placeholder="Enter Course Name"  name="name" className="InputContainer input"

value={course.name}
onChange={handleChange}   required  />
  
    <select name="mentor" className="InputContainer input"   required
value={course.mentor}
onChange={handleChange}>
<option value="">Select Mentor</option>

{mentors.map((mentor) => (
    <option key={mentor._id} value={mentor._id}>
        {mentor.name}
    </option>
))}
</select>
   
    <textarea type="text" placeholder="Enter description"  className="InputContainer input"    required
name="description"
value={course.description}
onChange={handleChange}
/>
    <input type="text" placeholder="Enter duration of course " name ="duration" value={course.duration} onChange={handleChange}  className="InputContainer input"   required />
    <input type="text" placeholder="Enter course fee"  name="fee" value={course.fee} onChange={handleChange}   className="InputContainer input"   required />
<div className="flex w-full justify-around p-4">
<button type="submit" className="button-72" >
submit
</button>
<button type="button"  onClick={()=>{
        setaddCourse(false);
        setCourse({
          CourseID:"",
            name:"",
            description:"",
            duration:"",
            fee:"",
            mentor:""
        })
    }}   className="button-82-pushable button-82-shadow button-82-edge button-82-front "> close </button>
    </div>
</form>

}


{viewCourse && 
<div className="w-full h-96  ">  
    <div>
      
    {courses.map((course, index) => {
  return (
    <div
      key={course._id || index}
      className="w-full h-20 flex justify-between items-center p-4 border-b border-gray-900/10"
    >
      <div className="text-xl font-semibold">
        {course.name}
      </div>

      <div className="text-lg">
        {course.description}
      </div>

      <div className="text-lg">
        {course.duration}
      </div>

      <div className="text-lg">
        ₹{course.fee}
      </div>

      <div className="text-lg">
        {course.mentor?.name || "No mentor assigned"}
      </div>
    </div>
  );
})} 
      <button type="button"  onClick={()=>{
        setviewCourse(false);
        setCourses([]);
    }}   className="button-82-pushable button-82-shadow button-82-edge button-82-front "> close </button>
    </div>
    </div>}

{editCourse && 
<div className="w-full h-96  ">
<form onSubmit={(e) => {
    handleUpdate(e);
}} className="flex flex-col justify-center items-center w-xl mx-auto mt-10 p-8 
              backdrop-blur-md
             rounded-3xl
             border border-white/60
             shadow-[0_15px_40px_rgba(0,0,0,0.12)]
             space-y-5 ">
              <div className="flex gap-4 justify-center items-center">
  <input type="text" name="CourseID" value={course.CourseID} onChange={handleChange} placeholder="enter CourseID for search"
  className="InputContainer input" />
  <button type="button"  className="button-41"     onClick={searchForCourseID}>search
   </button>
   </div>
   <input className="InputContainer input" placeholder="update name"
  name="name"
  value={course.name}
  onChange={handleChange}
/>

<input className="InputContainer input " placeholder="update description"
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
    <option value="">Select Mentor</option>

    {mentors.map((mentor) => (
        <option key={mentor._id} value={mentor._id}>
            {mentor.name}
        </option>
    ))}
</select>
<input type="text" name="duration" value={course.duration} onChange={handleChange} />
<input className="InputContainer input"
  name="fee"
  value={course.fee}
  placeholder="update phone"
  onChange={handleChange}
/>
  
<div className="flex gap-4 justify-evenly" 
  >
<button     type="submit"  className="button-72  ">
  Update Course
</button>
<button type="button" className=" button-82-pushable button-82-shadow button-82-edge button-82-front" onClick={()=>{
            seteditCourse(false);
            

        }}  > close </button>
</div>
</form>
</div>
}






{deleteCourse && 
<div>
<form onSubmit={(e) => {
    handleDelete(e);
}} className="flex flex-col justify-center items-center w-xl mx-auto mt-10 p-8 
              backdrop-blur-md
             rounded-3xl
             border border-white/60
             shadow-[0_15px_40px_rgba(0,0,0,0.12)]
             space-y-5 ">
              <div className="flex gap-4 justify-center items-center">
  <input type="text" name="CourseID" value={course.CourseID} onChange={handleChange} placeholder="enter CourseID for search"
  className="InputContainer input" />
  <button type="button"  className="button-41"     onClick={async()=>{
   await searchForCourseID();
  setdeleteCourseBox(true)
  }
  }>search
   </button>
   </div>
   {  deleteCourseBox && 
   <div
  key={course.CourseID }
  className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  {/* Course Header */}
  <div className="flex items-start justify-between mb-5">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {course.name}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Course ID: {course.CourseID}
      </p>
    </div>


    <div className="rounded-xl bg-green-50 px-4 py-2 text-lg font-bold text-green-600">
      ₹{course.fee}
    </div>
  </div>


  <div className="mb-5">
    <p className="text-sm font-medium text-gray-500 mb-1">
      Description
    </p>

    <p className="text-gray-700 leading-relaxed">
      {course.description}
    </p>
  </div>


  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-5">


    <div>
      <p className="text-sm font-medium text-gray-500">
        Duration
      </p>

      <p className="mt-1 text-base font-semibold text-gray-800">
        {course.duration}
      </p>
    </div>

    {/* Mentor */}
    <div>
      <p className="text-sm font-medium text-gray-500">
        Mentor
      </p>

      <p className="mt-1 text-base font-semibold text-gray-800">
      {mentors.find(
    mentor => mentor._id === course.mentor
  )?.name || "No mentor assigned"}

      </p>
    </div>

  </div>
</div> }
<div className="flex gap-4 justify-evenly" 
  >
<button     type="submit"  className="button-72  ">
 Delete Course
</button>
<button type="button" className=" button-82-pushable button-82-shadow button-82-edge button-82-front" onClick={()=>{
           setdeleteCourse(false)

        }}  > close </button>
</div>
</form>
  
  </div>
      }

    </div>
    </>
)}

export default Courses;