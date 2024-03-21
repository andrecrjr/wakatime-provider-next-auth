import React from 'react'
import Image from "next/image";
import styles from "./page.module.css";
import LoginButton from './components/Button'
import { authHandler } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { log } from 'console';

export default async function Home() {
  const data = await getServerSession(authHandler)
    console.log(data);
    
  return (
    <main className={styles.main}>
      {data?.user?.name ? JSON.stringify(data): <LoginButton />}
    </main>
  );
}
