import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavBarPaths = ["/login", "/signup", "/"];

  const showNavBar = !noNavBarPaths.includes(location.pathname);

  return (
    <div>
      {showNavBar && <NavBar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
