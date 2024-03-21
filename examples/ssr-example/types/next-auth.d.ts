import { DefaultSession } from "next-auth";
import {UserWakatimeProfile} from "wakatime-next-auth"

declare module "next-auth" {
  interface Session {
    user: UserWakatimeProfile & DefaultSession["user"];
  }
}