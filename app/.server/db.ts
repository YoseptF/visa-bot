import { Database } from "./database.types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.PUBLIC_SUPABASE_KEY!
);

export default supabase;