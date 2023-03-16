import React from "react";
import { useState } from "react";
import  { useNavigate }  from "react-router-dom";

export default function Login() {
  const [userCreds,setUserCreds]=useState({email:"",password:""})
  let navigate=useNavigate();
   const backendLogin=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: userCreds.email,password:userCreds.password})
    });
    const json=await response.json();
    console.log("json",json.authToken);
    console.log("json",json);

      if(json.success){
        localStorage.setItem('token',json.authToken)
        navigate("/")
      }
      else{
        alert("Enter valid creds")
      }
   }
   const onChange = (e)=>{
    setUserCreds({...userCreds, [e.target.name]: e.target.value})
}
  return (
    <>
      <div className="container">
    <form onSubmit={backendLogin}>
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" name="email" value={userCreds.email} aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" value={userCreds.password} onChange={onChange}/>
        </div>
        <div class="mb-3 form-check">
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
    </form>
      </div>
    </>
  );
}
