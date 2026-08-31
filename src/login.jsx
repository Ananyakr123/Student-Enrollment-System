import {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const Login=()=>{
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit=async()=>{
        e.preventDefault();
        try{
const reponse =await fetch("http://localhost:5001/api/auth/login", {
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
            setError(error.message);
        }
    }
    return (<>
    <div>
        <div>
            <div> Welcome Back!
                <form >
<div>
    <label >Enter your name</label>
    <input  type="email"
              value={email}  onChange={ (e)=>{ setEmail(e.target.value)}} />
</div>
<div>
    <label >Enter your Password</label>
    <input  type="password"
              value={password}  onChange={ (e)=>{ setPassword(e.target.value)}} />
</div>
<button
            type="submit"
         
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
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