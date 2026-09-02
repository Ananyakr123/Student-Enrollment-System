import {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './form.css'
const Login=()=>{
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
const response =await fetch("http://localhost:5001/api/auth/login", {
    method:"POST",
    headers:{
       "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email,
        password
    })
})

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Login failed");
}
localStorage.setItem("token",data.token);
localStorage.setItem("user",JSON.stringify(data.user));
navigate("/dashboard");
        }catch(e){
          alert(e.message);
        }
    }
    return (<>
    <div className='flex justify-center items-center h-screen bg-gradient-to-br from-cyan-200 via-green-100 to-yellow-100 '>
        <div className='min-h-1/3  min-w-md  gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-5 shadow-2xl '>
            <div className='flex flex-col justify-center items-center gap-1'> <div className='text-3xl  text-blue-900 font-serif font-stretch-50%'>Welcome Back!</div>
                <form onSubmit={handleSubmit} className=' flex flex-col items-center gap-2' >
<div className=' flex flex-col gap-1'>
    <label >Enter your email</label>
    <input  type="email" className='inputfield'
              value={email}  onChange={ (e)=>{ setEmail(e.target.value)}} />
</div>
<div className=' flex flex-col gap-1  '>
    <label >Enter your Password</label>
    <input  type="password" className='inputfield'
              value={password}  onChange={ (e)=>{ setPassword(e.target.value)}} />
</div>
<button
            type="submit"
         
            className="w-full  py-2 shadow   hover:bg-indigo-400 ho rounded-xl bg-white text-black hover:text-white transition "
          >login
          </button>
                </form>
                <div>
                    Dont have an account ? {" "}
                    <NavLink
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </NavLink>
                </div>
            </div>
        </div>
    </div>
    
    </>)
}
export default Login;