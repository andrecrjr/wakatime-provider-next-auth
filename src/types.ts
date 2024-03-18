export interface RootUserWakatimeProfile  {
  data: UserWakatimeProfile
}

export interface UserWakatimeProfile extends Record<string, any>  {
  id: string
  email?: string
  timezone?: string
  timeout?: number
  writes_only?: boolean
  created_at?: string
  share_all_time_badge?: boolean
  last_plugin?: string
  meetings_over_coding?: boolean
  profile_url?: string
  full_name: string
  linkedin_username?: string
  languages_used_public?: boolean
  last_heartbeat_at?: string
  location?: any
  has_basic_features?: boolean
  github_username?: string
  city?: UserWakatimeCityProfile
  human_readable_website?: string
  invoice_id_format: string
  is_hireable?: boolean
  last_plugin_name?: string
  photo_public?: boolean
  modified_at?: string
  needs_payment_method?: boolean
  time_format_24hr?: any
  date_format?: string
  has_premium_features?: boolean
  logged_time_public?: boolean
  twitter_username?: string
  plan?: string
  time_format_display?: string
  profile_url_escaped?: string
  username: string
  last_project: string
  color_scheme: string
  show_machine_name_ip: boolean
  bio: string
  is_email_confirmed: boolean
  is_email_public: boolean
  public_profile_time_range: string
  public_email: any
  website: string
  is_onboarding_finished: boolean
  weekday_start: number
  share_last_year_days: boolean
  wonderfuldev_username: string
  default_dashboard_range: string
  last_branch: string
  display_name: string
  photo: string
  durations_slice_by: string
}

export interface UserWakatimeCityProfile {
  id: string
  name: string
  ascii_name: string
  state: string
  ascii_state: string
  country_code: string
  population: number
  timezone: string
  country: string
  title: string
}
