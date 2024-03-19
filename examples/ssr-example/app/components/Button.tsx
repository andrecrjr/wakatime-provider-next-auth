'use client'
import React from 'react'
import { signIn } from "next-auth/react";



const LoginButton = () => {
  return (<button onClick={()=>{ signIn("wakatime") }}>
        Login Wakatime
    </button>);
};

export default LoginButton;