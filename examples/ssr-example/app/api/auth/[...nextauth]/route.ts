import { NextApiRequest } from "next";
import { AuthOptions } from "next-auth";
import WakatimeProvider from "next-auth-wakatime"
import NextAuth from "next-auth/next";


 const authHandler = NextAuth({ providers: [WakatimeProvider({
        clientId:process.env.CLIENT_ID!,
        clientSecret:process.env.CLIENT_SECRET!,
        authorization: {
          params: {
            scope:"email,read_stats,read_summaries,read_stats,read_summaries.projects,read_summaries.languages",
        }
      }
    })]})


export { authHandler as GET, authHandler as POST}
