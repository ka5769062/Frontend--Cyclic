"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myUser = () => {
  const [passShow, setPassShow] = useState(false);

  const [inputVal, setInputVal] = useState({
    username: "",
    email: "",
    phone: "",
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

    const { username, email, phone, password } = inputVal;

    if (username === "") {
      toast.error("username is required!", {
        position: "top-center",
      });
    } else if (email === "") {
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
      // console.log("registered succesfully");

      const data = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);
      if (res) {
        toast.success("Registration Successfully done 😃!", {
          position: "top-center",
        });
        setInputVal({
          ...inputVal,
          username: "",
          email: "",
          phone: "",
          password: "",
        });
      }
    }
  };

  return (
    <div>
      <section>
        <div className="w-[620px] m-auto h-[520px] rounded mt-10 shadow-lg ">
          <div className="text-center pt-[30px] text-purple-900">
            <h1 className="text-3xl font-semibold">SignUp</h1>
            <p>Hi,we are very glad you are back.Please login </p>
          </div>
          <form>
            <div className="flex flex-col m-auto mt-6 w-[320px] h-[450px] items-center relative">
              <label className="me-auto font-semibold pb-1 ">Name</label>
              <input
                value={inputVal.username}
                onChange={setVal}
                name="username"
                id="username"
                type="text"
                placeholder="Username"
                className="border-2 w-[320px] h-[40px] p-3"
              ></input>
              <label className="me-auto font-semibold pb-1 ">Email</label>
              <input
                value={inputVal.email}
                onChange={setVal}
                name="email"
                id="email"
                type="Email"
                placeholder="Your Email"
                className="border-2 w-[320px] h-[40px] p-3"
              ></input>

              <label className="me-auto font-semibold pb-1">Phone</label>
              <input
                value={inputVal.phone}
                onChange={setVal}
                name="phone"
                id="phone"
                type="text"
                placeholder="Your number"
                className="border-2 w-[320px] h-[40px] p-3"
              ></input>
              <label className="me-auto font-semibold pt-1 pb-1">
                Password
              </label>
              <div
                onClick={() => {
                  setPassShow(!passShow);
                }}
                className="cursor-pointer absolute top-[243px] right-2 bg-neutral-300 rounded text-black"
              >
                {!passShow ? "Show" : "Hide"}
              </div>
              <input
                value={inputVal.password}
                onChange={setVal}
                name="password"
                id="password"
                type={passShow ? "text" : "password"}
                placeholder="Your Password"
                className=" border-2 w-[320px] h-[40px] p-3 pr-[60px]"
              ></input>

              <button
                onClick={addUserData}
                className="bg-purple-900 hover:bg-purple-500 w-full text-white rounded h-11 mt-5"
              >
                SignUp
                <ToastContainer />
              </button>
              <p className="mt-5">
                Already have an account?<Link href="/">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default myUser;
