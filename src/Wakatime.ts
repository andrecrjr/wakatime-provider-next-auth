import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { tokenConverter } from "./utils";
import { RootUserWakatimeProfile, UserWakatimeProfile } from './types'

export default function WakatimeProvider<G extends RootUserWakatimeProfile>( options:OAuthUserConfig<G>):OAuthConfig<G>{
    return  {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      clientId: process.env.WAKATIME_CLIENT_ID,
      clientSecret: process.env.WAKATIME_CLIENT_SECRET,
      version: "2.0",
      token: {
        url:"https://wakatime.com/oauth/token",
        async request(context) {
          const response = await fetch("https://wakatime.com/oauth/token", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ ...context.params, 
              redirect_uri: context.provider.callbackUrl })
          });
          const data = await response.text()
          const tokenWaka = tokenConverter(data)
          return {tokens:tokenWaka}
        }, 
        params:{
          client_id:process.env.WAKATIME_CLIENT_ID,
          client_secret:process.env.WAKATIME_CLIENT_SECRET,
          grant_type:"authorization_code"
        }
      },
      authorization: {
          url:"https://wakatime.com/oauth/authorize?response_type=code", params:
        {
          scope:"email,read_stats,read_summaries",
          "grant_type":"authorization_code"
        }
      },
    userinfo: {
      async request(context){
        const response = await fetch("https://wakatime.com/api/v1/users/current", {
          headers: {Authorization: `Bearer ${context.tokens.access_token}`}
        })
        const data = await response.json()
        return data
      }
    },
    idToken:false,
    profile(profile) {
      const data: UserWakatimeProfile = profile.data
      return {id:data.id, name:data.username, email:data.email, image:data.photo}
    },
    accessTokenUrl: "https://wakatime.com/oauth/token",
    }
}