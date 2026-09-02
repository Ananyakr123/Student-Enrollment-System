import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './Dashboard.jsx'
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from './Layout.jsx'
import Students from './Students.jsx'
import Courses from './Courses.jsx'
import Mentors from './Mentors.jsx'
import Reports from './Reports.jsx'
import Login from './login.jsx'
import SignUp from './SignUp.jsx'

function App() {
  

  return (
    <>

     <Routes>
     <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
 
  <Route element={<ProtectedRoutes />}>
  <Route element={<Layout />}>
<Route path="/dashboard" element={<Dashboard />} />

<Route path="/students" element={<Students />} />

<Route path="/courses" element={<Courses />} />

<Route path="/mentors" element={<Mentors />} />

<Route path="/reports" element={<Reports />} />
</Route>
</Route>
  </Routes>

    </>
  )
}

export default App
