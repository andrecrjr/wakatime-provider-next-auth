# Wakatime Provider for NextAuth

This is a simple provider to integrate Wakatime authentication into your Next.js project using NextAuth.js. It's primarily for educational purposes but is fully functional and can be used as-is.

## Getting Started

### Create Your Wakatime App

First, you need to create a new application on Wakatime:

1. Visit Wakatime Apps and create a new app.
2. Note down the `Client ID` and `Client Secret`.

### Installation

Install the necessary packages:

```bash
npm install next-auth wakatime-next-auth
```
## Configuration

You can find all available scopes in the [Wakatime Authentication Documentt](https://wakatime.com/developers#authentication)

Configure the Wakatime provider inside your `[...nextauth]/route.ts` route:

```TypeScript

import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import WakatimeProvider, {UserWakatimeProfile} from "wakatime-next-auth"

 export const authHandler:NextAuthOptions = NextAuth({ providers: [
    WakatimeProvider({
        clientId:process.env.CLIENT_ID!,
        clientSecret:process.env.CLIENT_SECRET!,
        authorization: {
          params: {
            scope:"email,read_stats,read_summaries", // add more scopes from wakatime authentication docs
        }
      },
    }),     //...Add other providers if you need
    ], 
    secret:process.env.NEXTAUTH_SECRET, 
    session:{
      strategy: "jwt"
    }})

  // Add additional NextAuth configuration here
});
```

### Usage

Implement the sign-in functionality using the NextAuth.js React hooks:
```Typescript
import { signIn } from "next-auth/react";

const LoginButton = () => (
  <button onClick={() => signIn("wakatime")}>
    Login with Wakatime
  </button>
);

export default LoginButton;
```

## Handling User Sessions

To access more data from useSession, you may need to customize the callbacks inside NextAuth in `[...nextauth]/route.ts`:

```TypeScript
import WakatimeProvider, {UserWakatimeProfile} from "wakatime-next-auth"
// inside NextAuth Handler
// all provider code
callbacks: {
  async jwt({ token, account, user }) {
  if (user) {
    token.user = user;
  }
  return token;
},
async session({ session, token }) {
  if (token.user) {
    session.user = token.user as UserWakatimeProfile;
  }
  return session;
},
}
```
obs: it will give only informations inside client component all the data you'll need, from server side, you'll just get email, name and image for security purposes. 


### User session
Front end data and Back-end data can be retrieved by its hooks `useSession(authHandler)` and `getServerSession(authHandler)`, like any other provider.
Don't forget to handle between user sessions like the example above to get data faster in front-end.

Type Session for Typescript
```Typescript
// next-auth.d.ts

import { DefaultSession } from "next-auth";
import {UserWakatimeProfile} from "wakatime-next-auth"

declare module "next-auth" {
  interface Session {
    user: UserWakatimeProfile & DefaultSession["user"];
  }
}
```

### Server Session 
```Typescript
// server
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function User() {
   const data = await getServerSession(authOptions)
  if(!!data)
    return (
      <p>
        {JSON.stringify(data)}
      </p>
  )
}
```

### Front-end Session 

don't forget to create a client component to wrap using `<SessionProvider>` from next-auth.

```Typescript
// front-end component
'use client'
import { useSession } from "next-auth/react";
import React from "react";


export default function Page() {
  const {data} = useSession()
  // get all profile data
  return <div>{JSON.stringify(data?.user)}</div>;
}

```


Remember to replace the placeholders with your current environment variables and adjust the configuration to suit your project’s needs.