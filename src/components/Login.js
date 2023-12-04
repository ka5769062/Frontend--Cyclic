"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const router = useRouter();
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const { email, password } = inputVal;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("include @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 8) {
      toast.error("password must be 8 char", {
        position: "top-center",
      });
    } else {
      const data = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();
      if (res) {
        toast.success("Login Successfull💋😘😜!", {
          position: "top-center",
        });

        localStorage.setItem("userstoken", res.token);
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);

        setInputVal({ ...inputVal, email: "", password: "" });
      }
    }
  };

  return (
    <div>
      <section>
        <div className="w-[620px] m-auto h-[420px] rounded mt-10 shadow-lg ">
          <div className="text-center pt-[30px] text-purple-900">
            <h1 className="text-3xl font-semibold">Welcome Back,Log In</h1>
            <p>Hi,we are very glad you are back.Please login </p>
          </div>
          <form className="">
            <div className="flex flex-col m-auto mt-6 w-[320px] h-[250px] items-center relative">
              <label className="me-auto font-semibold pb-1 ">Email</label>
              <input
                onChange={setVal}
                name="email"
                value={inputVal.email}
                type="text"
                placeholder="Your Email"
                className="border-2 w-[320px] h-[40px] p-3"
              ></input>
              <label className="me-auto font-semibold pt-1 pb-1">
                Password
              </label>
              <div
                onClick={() => {
                  setPassShow(!passShow);
                }}
                className="cursor-pointer absolute top-[109px] right-2 bg-neutral-300 rounded text-black"
              >
                {!passShow ? "Show" : "Hide"}
              </div>
              <input
                onChange={setVal}
                name="password"
                value={inputVal.password}
                type={passShow ? "text" : "password"}
                placeholder="Your Password"
                className=" border-2 w-[320px] h-[40px] p-3 pr-[60px]"
              ></input>
              <button
                onClick={addUserData}
                className="bg-purple-900 hover:bg-purple-500 w-full text-white rounded h-11 mt-5"
              >
                <ToastContainer />
                Login
              </button>
              <p className="mt-5">
                Don't have an account?<Link href="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
