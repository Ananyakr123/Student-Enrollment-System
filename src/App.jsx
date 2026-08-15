import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './Dashboard.jsx'
import Layout from './Layout.jsx'
import Students from './Students.jsx'
function App() {
  

  return (
    <>

     <Routes>
     <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="students" element={<Students/>}/>

  </Route>
    </Routes>
    </>
  )
}

export default App
