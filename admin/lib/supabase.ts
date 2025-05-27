import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our analytics data
export interface PageView {
  id?: string
  page_path: string
  page_title?: string
  referrer?: string
  user_agent?: string
  ip_address?: string
  country?: string
  city?: string
  device_type?: string
  browser?: string
  os?: string
  session_id?: string
  created_at?: string
}

export interface UserInteraction {
  id?: string
  session_id: string
  event_type: string
  element_id?: string
  element_type?: string
  page_path: string
  data?: any
  created_at?: string
}

export interface ProjectView {
  id?: string
  project_id: string
  project_title?: string
  session_id?: string
  referrer?: string
  created_at?: string
}

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  subject?: string
  message: string
  session_id?: string
  status?: string
  created_at?: string
}

export interface SocialClick {
  id?: string
  platform: string
  session_id?: string
  page_path?: string
  created_at?: string
}
