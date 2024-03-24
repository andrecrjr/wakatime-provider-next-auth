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

To retrieve more data from useSession (client side), you may need to customize the callbacks inside NextAuth in `[...nextauth]/route.ts`:

```TypeScript
import WakatimeProvider, { UserWakatimeProfile } from "wakatime-next-auth";

// Inside NextAuth Handler
// ... All provider code
callbacks: {
  async jwt({ token, account, user }) {

    if (user) {
      token.user = user;
    }

    /* -------- Retrieve more data  -------- 
    
    if (account && account.access_token) {
      // Use the access token to fetch additional data from an API
      const response = await fetch('https://api.wakatime.com/api/v1/users/heartbeat', {
        headers: {
          Authorization: `Bearer ${account.access_token}`
        }
      });

      // If the fetch operation is successful, add the data to the token
      if (response.ok) {
        const data = await response.json();
        // Add the fetched data to the token
        token.wakatimeData = data;
      } else {
        // Handle errors or unsuccessful fetch operations here
        console.error('Failed to fetch Wakatime data:', response.statusText);
      } ---------------------- */

    /* -----------Token Rotation-------------  
    // Check if the account object exists and if the access token is about to expire
    if (account && account.expires_at) {
      // Convert expiry time to milliseconds to compare with the current time
      const now = Date.now();
      const expiryTime = account.expires_at * 1000;

      // If the current time is close to the expiry time, request a new access token
      if (now + (60 * 1000) > expiryTime) { // Refresh the token 1 minute before it expires
        // Implement the logic to refresh the token here
        // This usually involves making a request to the OAuth provider's token endpoint
        // token.accessToken = await refreshAccessToken(account.refresh_token);
      }
    }  ---------------------- */

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

### Type Session for Typescript
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