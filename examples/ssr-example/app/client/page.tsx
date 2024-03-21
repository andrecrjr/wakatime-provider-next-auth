// front-end component
import { useSession } from "next-auth/react";
import React from "react";
import ClientPage from "../components/PageClient"

export default function Page() {
  
  // get all profile data
  return <ClientPage />;
}