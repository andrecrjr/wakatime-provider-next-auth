'use client'
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

export default function ClientPage() {
  const {data} = useSession()
  // get all profile data
  return <div>{JSON.stringify(data?.user)}
  <p>Bio: {data?.user.bio}</p>
  </div>;
}