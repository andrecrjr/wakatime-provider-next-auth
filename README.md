# Wakatime Provider for NextAuth.js

This is a simple provider to integrate Wakatime authentication into your Next.js project using NextAuth.js. It's primarily for educational purposes but is fully functional and can be used as-is.

## Getting Started

### Create Your Wakatime App

First, you need to create a new application on Wakatime:

1. Visit Wakatime Apps and create a new app.
2. Note down the `Client ID` and `Client Secret`.

### Installation

Install the necessary packages:

```bash
npm install next-auth next-auth-wakatime
```
## Configuration

You can find all available scopes in the [Wakatime Authentication Documentt](https://wakatime.com/developers#authentication)

Configure the Wakatime provider inside your `[...nextauth]/route.ts` route:

```TypeScript

import NextAuth from "next-auth";
import WakatimeProvider from "next-auth-wakatime";

export default NextAuth({
  providers: [
    WakatimeProvider({
      clientId: process.env.WAKATIME_CLIENT_ID,
      clientSecret: process.env.WAKATIME_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email,read_stats,read_summaries", // DON'T FORGET this is Required scopes in the code to work
        },
      },
    }),
  ],
  // Add additional NextAuth configuration here
});
```



Usage
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

To access more data from useSession, you may need to customize the callbacks:

```TypeScript

callbacks: {
  async jwt({ token, account, user }) {
    if (user) {
      token.user = user;
    }
    return token;
  },
  async session({ session, token }) {
    if (token.user) {
      session.user = token.user;
    }
    return session;
  },
},
```

Remember to replace the placeholders with your actual environment variables and adjust the configuration to suit your project’s needs.