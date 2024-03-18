import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { tokenConverter } from "./utils";
import { UserWakatimeProfile} from './types'

import Providers from "next-auth/providers"

export default function WakatimeProvider<G extends UserWakatimeProfile>( options:OAuthUserConfig<G>):OAuthConfig<G>{
    return {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      version: "2.0",
      token: {url:"https://wakatime.com/oauth/token",
          async request(context:any) {
            // todo: type for context
                const response = await fetch("https://wakatime.com/oauth/token",
                    {   ...context.params, 
                        redirect_uri:context.provider.callbackUrl, 
                        method:"POST" },
                    );
                const {data} = await response.json()
                const tokenWaka = tokenConverter(data)
                return {tokens:tokenWaka}
          }, 
          params:{
            client_id:process.env.WAKATIME_CLIENT_ID,
            client_secret:process.env.WAKATIME_CLIENT_SECRET,
            grant_type:"authorization_code"
          },
        },
      authorization: {
          url:"https://wakatime.com/oauth/authorize?response_type=code",
          params: {
          scope:"email,read_stats,read_summaries",
          "grant_type":"authorization_code"
        }
      },
      userinfo: {
        async request(context:any){
          // todo: type for context
          const response = await fetch("https://wakatime.com/api/v1/users/current", {
            headers: {Authorization: `Bearer ${context.tokens.access_token}`}
          })
          const data = await response.json()
          return data
        },
      },
      profile(profile:UserWakatimeProfile) {
        const data = profile.data
        return data
      },
      accessTokenUrl: "https://wakatime.com/oauth/token",
      options
      }
}