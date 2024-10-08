import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { SUPABASE_BASE_URL } from "../../constants";

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL! || SUPABASE_BASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  options
);
