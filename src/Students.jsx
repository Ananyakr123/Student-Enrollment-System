import { useState } from "react";
import { NavLink } from "react-router-dom";
import './button.css'
const Students =()=>{
    const [addStudent, setaddStudent]=useState(false);
    const [deleteStudent, setdeleteStudent]=useState(false);
    const [viewStudent, setviewStudent]=useState(false);
    const [updateStudent, setupdateStudent]=useState(false);



    const [student, setStudent] = useState({
      name: "",
      phone: "",
      email: "",
      rollNo: "",
      course: ""
    });
  
    const handleChange = (e) => {
      setStudent({
        ...student,
        [e.target.name]: e.target.value
      });
    };


const handleSubmit=async(e)=>{
   e.preventDefault()
   try{
      const response=await fetch("http://localhost:5001/api/students", 
         {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
          }
      );
      const data=await response.json();
      if (response.ok) {
         alert("Student added successfully!");
   
         setStudent({
           name: "",
           phone: "",
           email: "",
           rollNo: "",
           course: ""
         });
       } else {
         alert(data.message || "Failed to add student");
       }
   }catch(e){
      console.log(e);
      alert("unable to connect to the backend");
   }
}



const searchForRoll=async(e)=>{
   e.preventDefault();
 try{
   const response =await fetch("http://localhost:5001/api/students/roll/"+student.rollNo);
   const data=await response.json();
 if(!response.ok){
   alert(data.message || "Student not found");
      return;
 }
 setStudent(data);
   }catch(e){
      console.log(e);
      alert("Something went wrong");
  

   }
 };


 const handleUpdate=async(e)=>{
   e.preventDefault();
   try{
      const response=await fetch("http://localhost:5001/api/students/roll/"+student.rollNo,{
method:"PUT",
headers: {
  "Content-Type": "application/json"
},

body:JSON.stringify(student)
      });
      const data=await response.json();
      if(response.ok){
        alert("Student updated successfully!");

        setStudent({
           name: "",
           phone: "",
           email: "",
           rollNo: "",
           course: ""})
      }else{
         alert(data.message ||" failed");
      }
   }catch(e){
      console.log(e);
      alert("unable to udpdate");
   }
 }

 const handleDelete=async(e)=>{
  e.preventDefault();
try{
  const response=await fetch("http://localhost:5001/api/students/roll/"+student.rollNo,{
    method:"DELETE"
  });

  const data = await response.json();

        if (response.ok) {
            alert("Student deleted successfully");

            setStudent({
                name: "",
                phone: "",
                email: "",
                rollNo: "",
                course: ""
            });
        } else {
            alert(data.message || "Student not found");
        }

    } catch (e) {
        console.log(e);
        alert("Unable to delete student");
    }
};


 

    const courses = [
      "B.Tech IT",
      "B.Tech CSE",
      "BCA",
      "MCA",
      "MBA"
    ];
    
    return (
        <>

        <div className="min-h-screen p-10 w-full bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-6">
       
        <div className="mb-6 w-2/5 p-10 max-w-5xl min-h-[600] pb-0 shadow-lg backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_20px_60px_rgba(79,70,229,0.18)] flex flex-col items-center justify-center gap-6">
     <div className="bg-blue-300 button-19  " onClick={()=>{
        setaddStudent(true);
     }}>
        Add Student
     </div>
     <div className="button-19 " onClick={()=>{
        setupdateStudent(true);
     }}>
       Update Student Data
     </div>
     <div className="button-19 "  onClick={()=>{
        setdeleteStudent(true);
     }}>
        Delete Student
     </div> 
     <div className="button-19 "  onClick={()=>{
        setviewStudent(true);
     }}>
        View Student
     </div> 
     </div>
     <div>
     


    {addStudent && 
    <form className="mt-4 w-2xl border-b border-gray-900/10 pb-10   h-max flex flex-col justify-center items-center gap-6 mb-5  p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
       
        <input type="text" placeholder="Enter Student Name"  name="name" className="InputContainer input"

  value={student.name}
  onChange={handleChange}/>
      
        <select name="course" className="InputContainer input"
  value={student.course}
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





{updateStudent &&

<form className="flex flex-col justify-center items-center w-xl mx-auto mt-10 p-8 
              backdrop-blur-md
             rounded-3xl
             border border-white/60
             shadow-[0_15px_40px_rgba(0,0,0,0.12)]
             space-y-5 ">
              <div className="flex gap-4 justify-center items-center">
  <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="enter roll for search"
  className="InputContainer input" />
  <button type="button "  className="button-41"  onClick={(e)=>{
   searchForRoll(e);
  }}>search
   </button>
   </div>
   <input className="InputContainer input" placeholder="update name"
  name="name"
  value={student.name}
  onChange={handleChange}
/>

<input className="InputContainer input " placeholder="update email"
  name="email"
  value={student.email}
  onChange={handleChange}
/>

<input type="text" name="rollNo" value={student.rollNo}  readOnly/>
<input className="InputContainer input"
  name="phone"
  value={student.phone}
  placeholder="update phone"
  onChange={handleChange}
/>

<select className="InputContainer input"
  name="course"
  
  value={student.course}
  onChange={handleChange}
>
  <option value="">Select Course</option>

  {courses.map((course, index) => (
    <option key={index} value={course}> 
      {course}
    </option>
  ))}
</select>   
<div className="flex gap-4 justify-evenly" 
  >
<button onClick={(e)=>{
   handleUpdate(e);
}}  className="button-72  ">
  Update Student
</button>
<button type="button" className=" button-82-pushable button-82-shadow button-82-edge button-82-front" onClick={()=>{
            setupdateStudent(false);
            setStudent({
              name: "",
                phone: "",
                email: "",
                rollNo: "",
                course: ""
            })

        }}  > close </button>
</div>
</form>

}




{viewStudent &&

<form className="flex flex-col gap-2">
  <div className="flex gap-4 justify-around">
  <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="enter roll for search"
  className="InputContainer input"/>
  <button type="button " className="button-41" onClick={(e)=>{
   searchForRoll(e);
  }}>search
   </button>
   </div>
   <div className="font-bold font-mono ">Student Name: {student.name}</div>
   <div className="font-bold font-mono ">Student RollNo.: {student.rollNo}</div>
   <div className="font-bold font-mono ">Student Email: {student.email}</div>
   <div className="font-bold font-mono ">Student Phone: {student.phone}</div>
   <div className="font-bold font-mono ">Student course: {student.course}</div>
<button type="button" className="button-24" onClick={()=>{
            setviewStudent(false);
            setStudent({
              name: "",
                phone: "",
                email: "",
                rollNo: "",
                course: ""
            })
        }}  > close </button>

</form>

}


{deleteStudent &&

<form className="flex flex-col">
  <div className="flex gap-4 justify-around"  >
  <input type="text" name="rollNo" value={student.rollNo} onChange={handleChange} placeholder="enter roll for search"  
  className="InputContainer input"/>
  <button type="button " className="button-41 "  onClick={(e)=>{
   searchForRoll(e);
  }}>search
   </button>
   </div>
<div className="flex flex-col gap-5"> 
    <div className="text-center font-bold font-mono ">are you sure you want to delete record for:{student.name}</div>
<div className="flex gap-6 justify-evenly   h-20 items-center w-100 ">
<button onClick={(e)=>{
  handleDelete(e);
}} className="button-72">delete</button> 
<button type="button" className="button-24" onClick={()=>{
            setdeleteStudent(false);
            setStudent({
              name: "",
                phone: "",
                email: "",
                rollNo: "",
                course: ""
            })
        }}>cancel</button></div>
</div>



</form>

}

     </div>
     <NavLink to="/" className="button-41 absolute top-1 left-1 px-3 py-2" >Back to Dashboard</NavLink>
     </div>
        </>
    )}

export default Students;