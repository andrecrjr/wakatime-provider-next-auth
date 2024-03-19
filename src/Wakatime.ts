import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { tokenConverter } from "./utils";
import { RootUserWakatimeProfile } from './types'
import axios from "axios";

export default function WakatimeProvider<G extends RootUserWakatimeProfile>( options:OAuthUserConfig<G>):OAuthConfig<G>{
    return {
      id: "wakatime",
      name: "Wakatime",
      type: "oauth",
      version: "2.0",
      token: {
        url:"https://wakatime.com/oauth/token",
          async request(context:any) {
            // todo: type for context
              const response = await axios.post("https://wakatime.com/oauth/token",
              {...context.params, redirect_uri:context.provider.callbackUrl},
            );
            const tokensWakatime = tokenConverter(response.data)
            return {tokens:tokensWakatime}
          }, 
          params:{
            client_id:options.clientId,
            client_secret:options.clientSecret,
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
          const response = await axios.get("https://wakatime.com/api/v1/users/current", {
            headers: {Authorization: `Bearer ${context.tokens.access_token}`}
          })
          return response.data
        },
      },
      profile(profile:RootUserWakatimeProfile) {
        const data = profile.data
        return data
      },
      accessTokenUrl: "https://wakatime.com/oauth/token",
      options
      }
}