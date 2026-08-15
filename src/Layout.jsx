import {Outlet} from "react-router-dom";
import Banner from './Banner.jsx';
function Layout() {
    return (
      <>
        <Banner />
        <Outlet />
      </>
    );
  }
  export default Layout;