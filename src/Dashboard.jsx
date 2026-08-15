import './tabs.css'
import {NavLink} from 'react-router-dom';
const Dashboard=()=>{
    return (
        <>
        <div className="main h-11/12 w-full m-2 p-10 pl-5  pr-5 border bg-mauve-50 rounded-lg" style={{
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
}}>
            <div className="uppercontainer border-b-8 w-100% flex">
                <div className={'tabs_look'}>
                    <NavLink to="/Students" className="tabs_look">
          Student Management
        </NavLink></div>
                <div className= {'tabs_look '}  onClick={() => {
    console.log("hello");
  }} >  <NavLink to="/courses" className="tabs_look">
          Course Management
        </NavLink></div>
                <div className={'tabs_look'}>  <NavLink to="/students" className="tabs_look">
          Student Management
        </NavLink></div>
                <div className={'tabs_look'}>  <NavLink to="/report" className="tabs_look">
        Report Analysis
        </NavLink></div>
            </div>
        </div>
        </>
    )
}
export default Dashboard