import './tabs.css'
import {useNavigate} from 'react-router-dom'
import {
    Users,
    BookOpen,
    UserRound,
    BarChart3,
    ArrowRight

} from 'lucide-react'
import {Navigate, NavLink} from 'react-router-dom';
const Dashboard=()=>{
    const navigate=useNavigate();
    const handleLogout=async(e)=>{
        try{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
           navigate('/login')
        }catch(e){
            alert(e)
        }
    }
    return (
        <>
        <div className="main h-11/12 w-full m-2 p-10 pl-5   rounded-lg" 
>
            <div className="uppercontainer border-b-8 w-100% h-50 flex">
                <div className="tabs_look flex flex-col gap-2 p-3">
                <Users size={28} />
                <p className='font-light text-gray-400 text-xs'>add,edit and manage student data</p>
                    <NavLink to="/students" className="font-bold flex gap-2 ">
          Student Management <ArrowRight size={20}/>
        </NavLink></div>
                <div className= "tabs_look flex flex-col  gap-2 p-3" >
      <BookOpen size={28}/>
      <p className='font-light text-gray-400 text-xs'>add,edit and manage courses </p>
   <NavLink to="/courses" className="font-bold flex gap-2">

          Course Management <ArrowRight size={20}/>
        </NavLink></div>
                <div className="tabs_look flex flex-col  gap-2 p-3"> 
                    < UserRound size={28}/>
                    <p className='font-light text-gray-400 text-xs'>add,edit and manage mentors </p>
                     <NavLink to="/mentors" className="font-bold flex gap-2">
         Mentor Management <ArrowRight size={20}/>
        </NavLink></div>
                <div className="tabs_look flex flex-col  gap-2 p-3"> 
                    <BarChart3  size={28}/>
                    <p className='font-light text-gray-400 text-xs'>Data Analysis </p>
                     <NavLink to="/reports" className="font-bold flex gap-2">
        Report Analysis <ArrowRight size={20}/>
        </NavLink></div>
            </div>
            <button onClick={handleLogout} className='bg-gray-100 text-black shadow-lg shadow-mist-300 rounded-2xl p-5 w-40 absolute bottom-10 sm:w-20 md:w-30'>Logout</button>
        </div>
        </>
    )
}
export default Dashboard