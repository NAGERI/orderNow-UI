// src/components/NavBar.js
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            onClick={() => handleNavigation("/dashboard")}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/stores")}>
            Restaurants
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/orders")}>
            Orders
          </Button>
          {user?.role === "ADMIN" && (
            <Button color="inherit" onClick={() => handleNavigation("/users")}>
              Manage Users
            </Button>
          )}
        </Typography>
        <Box>
          {user ? (
            <>
              <Typography
                variant="h6"
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => handleNavigation("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
