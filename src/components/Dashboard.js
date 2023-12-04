'use client'
import { useContext } from "react";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginContext } from "./contextProvider/context";

const Dashboard = () => {

  const {loginData, setLoginData} = useContext(LoginContext)

  const router = useRouter()

  const dashboardValid = async () => {
    try{
      let token = localStorage.getItem("userstoken");
    
      const myDashboardApi = await fetch(
        "http://localhost:5000/api/auth/validuser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await myDashboardApi.json();

      if (data.status === 401) {
         router.push("/error")
      } else {
        console.log("user verifyied");
        setLoginData(data.validUserOne)
        router.push("/dashboard")
      }
    } 
    
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dashboardValid();
  }, []);
  
                
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-5">
        <Image
          src="/avataaars.png"
          width={200}
          height={200}
          alt="Picture of the author"
        />
        <h1 className="text-3xl font-semibold">
          User Email:{loginData ? loginData.email:""}
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
