
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://whkmnudljhmdydutsqzx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoa21udWRsamhtZHlkdXRzcXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyNzU3OTMsImV4cCI6MTk4Njg1MTc5M30.636dYt5e5vcK5IR69s_x0IR9jI_wdOP8hFO78MEuU3U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)