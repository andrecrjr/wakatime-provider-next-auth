import { NextApiRequest } from "next";
import { AuthOptions, NextAuthOptions } from "next-auth";

import NextAuth from "next-auth/next";
import WakatimeProvider from "wakatime-provider-next-auth";


 export const authHandler:NextAuthOptions = NextAuth({ providers: [
    WakatimeProvider({
        clientId:process.env.CLIENT_ID!,
        clientSecret:process.env.CLIENT_SECRET!,
        authorization: {
          params: {
            scope:"email,read_stats,read_summaries", // add more scopes from 
        }
      },
      
    }
    )], 
    secret:process.env.NEXTAUTH_SECRET, 
    debug: true,
    session:{
      strategy: "jwt"
    }})


export { authHandler as GET, authHandler as POST}
