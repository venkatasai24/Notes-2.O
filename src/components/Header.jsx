import { React, useContext, useState, useEffect } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Fab from "@mui/material/Fab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Themecontext } from "./App";
import { useAuth0 } from "@auth0/auth0-react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Header() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { theme, toggleTheme } = useContext(Themecontext);
  const [bg, setBg] = useState("#FF7034");
  const [bg1, setBg1] = useState("#FF7034");
  const fabStyle = {
    color: theme ? "black" : "white",
    boxShadow: "none",
    backgroundColor: bg,
    marginLeft: "10px",
  };
  const fabStyle1 = {
    color: theme ? "black" : "white",
    boxShadow: "none",
    backgroundColor: bg1,
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.dismiss(); // Dismiss any previous notifications
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    toast.error("Logout successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    await sleep(3000);
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <ToastContainer />
      <header
        style={{
          boxShadow: theme
            ? "0 1px 5px rgb(138, 137, 137)"
            : "0 0 10px 5px rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1 style={{ color: theme ? "black" : "white" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isAuthenticated ? (
              <div>
                <img
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                  }}
                  src={user.picture}
                  alt={user.name}
                />
              </div>
            ) : (
              <div>Notes</div>
            )}
            <div>
              {isAuthenticated ? (
                <>
                  <Fab
                    size="small"
                    onMouseEnter={() => setBg1("#FF8F6A")}
                    onMouseLeave={() => setBg1("#FF7034")}
                    onClick={handleLogout}
                    style={fabStyle1}
                  >
                    <LogoutIcon />
                  </Fab>
                </>
              ) : (
                <Fab
                  size="small"
                  onMouseEnter={() => setBg1("#FF8F6A")}
                  onMouseLeave={() => setBg1("#FF7034")}
                  onClick={() => loginWithRedirect()}
                  style={fabStyle1}
                >
                  <LoginIcon />
                </Fab>
              )}
              <Fab
                size="small"
                onMouseEnter={() => setBg("#FF8F6A")}
                onMouseLeave={() => setBg("#FF7034")}
                onClick={toggleTheme}
                style={fabStyle}
              >
                {theme ? <DarkModeIcon /> : <WbSunnyIcon />}
              </Fab>
            </div>
          </div>
        </h1>
      </header>
    </>
  );
}

export default Header;
