import { DefaultSession } from "next-auth";
import { UserWakatimeProfile } from "wakatime-provider-next-auth/lib/types"


declare module "next-auth" {
  interface Session {
    user?: UserWakatimeProfile & DefaultSession["user"];
  }
}