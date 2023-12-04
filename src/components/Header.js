"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { LoginContext } from "./contextProvider/context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goDashboard = () => {
    router.push("/dashboard");
  };

  const goError = () => {
    router.push("/error");
  };

  return (
    <div>
      <header>
        <nav className="flex justify-between p-6 border-b-[2px]">
          <h1 className="font-bold text-3xl">
            The<span className="text-red-400">Tech.</span>
          </h1>
          <div>
            {loginData ? (
              <Avatar onClick={handleClick} className="bg-red-500">
                {loginData.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar onClick={handleClick} className="bg-red-500"></Avatar>
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData ? (
              <div>
                <MenuItem onClick={()=>{
                  goDashboard()
                  handleClose()}}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={ ()=>{
                  goError()
                  handleClose()}}>Profile</MenuItem>
              </div>
            )}

           
          </Menu>
        </nav>
      </header>
    </div>
  );
};

export default Header;
