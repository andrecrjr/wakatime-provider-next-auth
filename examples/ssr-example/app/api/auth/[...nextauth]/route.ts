import { NextApiRequest } from "next";
import { AuthOptions } from "next-auth";
import WakatimeProvider from "next-auth-wakatime"
import NextAuth from "next-auth/next";


 const authHandler = NextAuth({ providers: [WakatimeProvider({
        clientId:process.env.CLIENT_ID!,
        clientSecret:process.env.CLIENT_SECRET!,
        authorization: {
          params: {
            scope:"email,read_stats,read_summaries", // add more scopes from 
        }
      },
      
    }
    )], secret:process.env.NEXT_AUTH_SECRET})


export { authHandler as GET, authHandler as POST}
