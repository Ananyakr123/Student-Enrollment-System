import react ,{ useState,useEffect } from 'react'
import './tabs.css'
import './button.css'


const Mentors=()=>{
    const [mentor,setMentor]=useState({
      MentorID:"",
        name:"",
        phone:"",
        email:"",
        highest_Education:"",
        experience:"",
        salary:"",
        courses:[]
    });
const [courses, setCourses] = useState([]);
const [mentors, setMentors] = useState([]);
const [addMentor,setaddMentor]=useState(false);
const [deleteMentorBox,setdeleteMentorBox]=useState(false);
const [viewMentor,setviewMentor]=useState(false);
const [editMentor,seteditMentor]=useState(false);
const [deleteMentor,setdeleteMentor]=useState(false);
const handleChange=(e)=>{
    try{
        
            const { name, value, selectedOptions } = e.target;
        
            if (name === "courses") {
                const selectedCourses = Array.from(
                    selectedOptions,
                    (option) => option.value
                );
        
                setMentor({
                    ...mentor,
                    courses: selectedCourses
                });
            } else {
                setMentor({
                    ...mentor,
                    [name]: value
                });
            }
     
    }catch(e){
        console.log(e);
    } }
    const searchForMentorID = async () => {
        try {
            console.log("MentorID:", mentor.MentorID);
    
            const response = await fetch(
                `http://localhost:5001/api/mentors/${mentor.MentorID}`
            );
    
            const data = await response.json();
    
            console.log("Server response:", data);
    
            if (!response.ok) {
                throw new Error(
                    data.message || "Mentor not found"
                );
            }
    
            const foundMentor = data.mentor || data;
    
            setMentor({
                MentorID: foundMentor.MentorID || "",
                name: foundMentor.name || "",
                phone: foundMentor.phone || "",
                email: foundMentor.email || "",
                highest_Education:
                    foundMentor.highest_Education || "",
                experience:
                    foundMentor.experience || "",
                salary:
                    foundMentor.salary || "",
                courses:
                    foundMentor.courses || []
            });
    
        } catch (e) {
            console.log("Search error:", e);
            alert(e.message);
        }
    };
  const  handleUpdate=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:5001/api/mentors/"+mentor.MentorID,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            
          },
          body:JSON.stringify(mentor)
        }
      );
      if(!response.ok){
        console.log("failed to update course");
      }
      console.log("course updated successfully");
      setMentor({
        MentorID:"",
        name:"",
        phone:"",
        email:"",
        highest_Education:"",
        experience:"",
        salary:"",
        courses:[]
      })
    }catch(e){
      console.log(e);
    }
  }

const getAllMentors=async()=>{
    try{
        const response=await fetch("http://localhost:5001/api/mentors");
        if(!response.ok){
            throw new Error("Failed to fetch courses");
        }
        const data=await response.json();
        setMentors(data);
    }catch(e){
        console.log(e);
    }
}
const handleSubmit =async (e) => {
    e.preventDefault();

    console.log("mentor:", mentor);
    try{
        const response= await fetch("http://localhost:5001/api/mentors",{
            method:"POST",
            headers:{
          "Content-Type":"application/json"
            },
            body:JSON.stringify(mentor)
        })
      
        const data=await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to add nentor");
          }
          console.log("mentor added:", data);

    alert("mentor added successfully!");
    
   
    setMentor({
        MentorID:"",
        name:"",
        phone:"",
        email:"",
        highest_Education:"",
        experience:"",
        salary:"",
        courses:[]
    });
    setaddMentor(false);
    }catch (error) {
        console.error("Error adding course:", error);
    
        alert(error.message);
      }
};
const handleDelete=async(e)=>{
    e.preventDefault();
  try{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;
const response = await fetch(`http://localhost:5001/api/mentors/${mentor.MentorID}`, {
  method:"DELETE",
 
});
const data = await response.json();
if(!response.ok){
  throw new Error(data.message || "Failed to mentor course");
}

  alert("successfully deleted");
  setdeleteMentorBox(false);

  setMentor({
    MentorID:"",
    name:"",
    phone:"",
    email:"",
    highest_Education:"",
    experience:"",
    salary:"",
    courses:[]
  })

  }catch(e){
console.log(e);
  }
}

useEffect(()=>{
    const fetchCourses=async()=>{
        try{
            const response=await fetch("http://localhost:5001/api/courses");
            if (!response.ok) {
                throw new Error("Failed to fetch mentors");
              }
            const data =await response.json();
            setCourses(data);

        }catch(e){
            console.log(e+"error in fetching courses");
        }
    };
    fetchCourses();
},[])
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
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200" 
          onClick={
            ()=>{
                setaddMentor(false);
                getAllMentors();
                setviewMentor(true);
                seteditMentor(false);
                setdeleteMentor(false);
            }}>All Mentors </div>
     <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200"  onClick={
            ()=>{
                setaddMentor(true);
                setviewMentor(false);
                seteditMentor(false);
                setdeleteMentor(false);
            }
          }>Add a Mentor </div>
    
    <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200"     onClick={
            ()=>{
                setaddMentor(false);
                setviewMentor(false);
                seteditMentor(true);
                setdeleteMentor(false);
            }}
          >Edit a information of a mentor </div>
    
    <div className="w-52  flex
          items-center
          justify-center
          transition-all
          duration-200
          cursor-pointer
          text-center shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] text-mist-50 \ h-36 border rounded-lg bg-blue-300 text-2xl p-3 font-mono pb-0text-slate-500 hover:text-neutral-50 hover:bg-blue-200" onClick={
            ()=>{
                setaddMentor(false);
                setviewMentor(false);
                seteditMentor(false);
                setdeleteMentor(true);
            }}
           > Delete a mentor</div>
    
    
        </div>
        {addMentor && 
    <form className="mt-4 w-2xl border-b border-gray-900/10 pb-10   h-max flex flex-col justify-center items-center gap-6 mb-5  p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <input type="text" name="MentorID" placeholder="Enter Mentor ID" value={mentor.MentorID}
    onChange={handleChange} className="InputContainer input"/>

    <input type="text" placeholder="Enter Mentor Name"  name="name" className="InputContainer input"

value={mentor.name}
onChange={handleChange}  />
 <input type="text" placeholder="Enter Mentor Phone number"  name="phone" className="InputContainer input"

value={mentor.phone}
onChange={handleChange}   required  />
 <input type="text" placeholder="Enter Mentor email"  name="email" className="InputContainer input"

value={mentor.email}
onChange={handleChange}   required  />
 <input type="text" placeholder="Enter Mentor's Highest Education'"  name="highest_Education" className="InputContainer input"

value={mentor.highest_Education}
onChange={handleChange}   required  />
   <textarea type="text" placeholder="Enter Mentor's Experience"  className="InputContainer input"    required
name="experience"
value={mentor.experience}
onChange={handleChange}
/>
 <input type="text" placeholder="Enter Mentor Salary"  name="salary" className="InputContainer input"

value={mentor.salary}
onChange={handleChange}   required  />
  
  <div className="courseSelector">

<div className="courseSelectorTitle">
    Select Courses
</div>

<div className="courseList">

    {courses.map((course) => {

        const isSelected =
            mentor.courses.includes(course.CourseID);

        return (
            <div
                key={course._id}
                className={`courseOption ${
                    isSelected
                        ? "courseOptionSelected"
                        : ""
                }`}
                onClick={() => {

                    if (isSelected) {

                        setMentor({
                            ...mentor,
                            courses: mentor.courses.filter(
                                (id) => id !== course.CourseID
                            )
                        });

                    } else {

                        setMentor({
                            ...mentor,
                            courses: [
                                ...mentor.courses,
                                course.CourseID
                            ]
                        });

                    }

                }}
            >

                <span>{course.name}</span>

                {isSelected && (
                    <span>✓</span>
                )}

            </div>
        );

    })}

</div>

</div>
   
<div className="flex w-full justify-around p-4">
<button type="submit" className="button-72" >
submit
</button>
<button type="button"  onClick={()=>{
        setaddMentor(false);
        setMentor({
            MentorID:"",
            name:"",
            phone:"",
            email:"",
            highest_Education:"",
            experience:"",
            salary:"",
            courses:[]
        })
    }}   className="button-82-pushable button-82-shadow button-82-edge button-82-front "> close </button>
    </div>
</form>

}



{viewMentor && (
    <div className="mentorView">

        <h2 className="mentorViewTitle">All Mentors</h2>

        <div className="mentorGrid">

            {mentors.map((mentor) => (
                <div className="mentorTab" key={mentor._id}>

                    <div className="mentorTabHeader">
                        <span className="mentorName">
                            {mentor.name}
                        </span>

                        <span className="mentorID">
                            {mentor.MentorID}
                        </span>
                    </div>

                    <div className="mentorTabInfo">
                        <p>{mentor.email}</p>
                        <p>{mentor.phone}</p>
                        <p>{mentor.highest_Education}</p>
                    </div>

                    <div className="mentorTabCourses">
                        {mentor.courses?.map((course, index) => (
                            <span className="mentorCourseTag" key={index}>
                                {course}
                            </span>
                        ))}
                    </div>

                </div>
            ))}

        </div>

    </div>
)
}


{editMentor &&

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
  <input type="text" name="MentorID" value={mentor.MentorID} onChange={handleChange} placeholder="enter MentorID for search"
  className="InputContainer input" />
  <button type="button"  className="button-41"     onClick={searchForMentorID}>search
   </button>
   </div>
   <input className="InputContainer input" placeholder="update name"
  name="name"
  value={mentor.name}
  onChange={handleChange}
/>

<input className="InputContainer input " placeholder="update phone"
  name="phone"
  value={mentor.phone}
  onChange={handleChange}
/>
<input className="InputContainer input " placeholder="update email"
  value={mentor.email}
  onChange={handleChange}
/>
<input className="InputContainer input " placeholder="update education"
  name="highest_Education"
  value={mentor.highest_Education}
  onChange={handleChange}
/>
<input className="InputContainer input " placeholder="update experience"
  name="experience"
  value={mentor.experience}
  onChange={handleChange}
/>
<input className="InputContainer input " placeholder="update salary"
  name="salary"
  value={mentor.salary}
  onChange={handleChange}
/>

  <div className="courseSelector">

<div className="courseSelectorTitle">
    Select Courses to update
</div>

<div className="courseList">

    {courses.map((course) => {

        const isSelected =
            mentor.courses.includes(course.CourseID);

        return (
            <div
                key={course._id}
                className={`courseOption ${
                    isSelected
                        ? "courseOptionSelected"
                        : ""
                }`}
                onClick={() => {
                    if (isSelected) {
                        setMentor(prev => ({
                            ...prev,
                            courses: prev.courses.filter(
                                id => id !== course.CourseID
                            )
                        }));
                    } else {
                        setMentor(prev => ({
                            ...prev,
                            courses: [...new Set([
                                ...prev.courses,
                                course.CourseID
                            ])]
                        }));
                    }
                }}
            >

                <span>{course.name}</span>

                {isSelected && (
                    <span>✓</span>
                )}

            </div>
        );

    })}

</div>

</div>
  
<div className="flex gap-4 justify-evenly" 
  >
<button     type="submit"  className="button-72  ">
  Update mentor
</button>
<button type="button" className=" button-82-pushable button-82-shadow button-82-edge button-82-front" onClick={()=>{
            seteditMentor(false);
            

        }}  > close </button>
</div>
</form>
</div>
}



{deleteMentor && 
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
  <input type="text" name="MentorID" value={mentor.MentorID} onChange={handleChange} placeholder="enter CourseID for search"
  className="InputContainer input" />
  <button type="button"  className="button-41"     onClick={async()=>{
   await searchForMentorID();
  setdeleteMentorBox(true)
  }
  }>search
   </button>
   </div>
   {  deleteMentorBox && 
   <div
  key={mentor.MentorID }
  className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
 
  <div className="flex items-start justify-between mb-5">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {mentor.name}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
     Mentor ID: {mentor.MentorID}
      </p>
    </div>


 

  <div className="mb-5">
    <p className="text-sm font-medium text-gray-500 mb-1">
    Email
    </p>

    <p className="text-gray-700 leading-relaxed">
      {mentor.email}
    </p>
  </div>


  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-5">


    <div>
      <p className="text-sm font-medium text-gray-500">
       Phone
      </p>

      <p className="mt-1 text-base font-semibold text-gray-800">
        {mentor.phone}
      </p>
    </div>

  
    

  </div>
</div> </div> 
}
<div className="flex gap-4 justify-evenly" 
  >
<button     type="submit"  className="button-72  ">
 Delete Mentor
</button>
<button type="button" className=" button-82-pushable button-82-shadow button-82-edge button-82-front" onClick={()=>{
           setdeleteMentor(false)

        }}  > close </button>
</div>
</form>
  
  </div>
      }
    </div>
    </>
)   }

export default Mentors;