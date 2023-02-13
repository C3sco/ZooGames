
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR URL'
const supabaseAnonKey = 'YOUR KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
