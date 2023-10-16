// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = "YOUR_SUPABASE_URL"; // Supabaseのプロジェクトダッシュボードから取得
// const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // 同じくダッシュボードから取得

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpkjrlknzzywtzgijvlh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwa2pybGtuenp5d3R6Z2lqdmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0Mjk2MTUsImV4cCI6MjAxMzAwNTYxNX0.X32ijBqNKwMI3AlCC_9gC-ZdfiZexFAHL3P7fQ-YPcY";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
