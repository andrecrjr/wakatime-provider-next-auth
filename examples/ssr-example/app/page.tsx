import React from 'react'
import Image from "next/image";
import styles from "./page.module.css";
import LoginButton from './components/Button'
import { authHandler } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const data = await getServerSession(authHandler)
  
  return (
    <main className={styles.main}>
      {data?.user?.name ? JSON.stringify(data): <LoginButton />}
    </main>
  );
}
