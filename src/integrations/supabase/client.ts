
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ntkrfmrsquwjncuhvfvs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50a3JmbXJzcXV3am5jdWh2ZnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNzYxMTMsImV4cCI6MjA1NzY1MjExM30.ycEp8sWfbYgZcB8bfYKPuDQ3nSPBLBsRC-uNL4BUsII";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
