import { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth/next";
import WakatimeProvider, {UserWakatimeProfile} from "wakatime-next-auth";

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
    },
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
  
  })


export { authHandler as GET, authHandler as POST}
