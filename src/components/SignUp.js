import React from "react";
import { useState } from "react";
import  { useNavigate }  from "react-router-dom";

export default function SignUp() {
  const [userCreds,setUserCreds]=useState({name:"", email:"",password:"",cpassword:""})
  let navigate=useNavigate();

   const backendSignUp=async(e)=>{
    const{name,email,password}=userCreds;
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password})
    });
    const json=await response.json();
    console.log(json);
      if(json.success){
        localStorage.setItem('token',JSON.stringify(json.authToken))
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
    <form onSubmit={backendSignUp}>
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="name" name="name" value={userCreds.name} onChange={onChange}/>
        </div>
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" name="email" value={userCreds.email} aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name="password" value={userCreds.password} onChange={onChange} minLength="5" required/>
        </div>
        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="cpassword" name="cpassword" value={userCreds.cpassword} onChange={onChange}/>
        </div>
        <div class="mb-3 form-check">
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
    </form>
      </div>
    </>
  );
}
