import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://julohlqxqvuzhnyfwfhq.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bG9obHF4cXZ1emhueWZ3ZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4NDkyMTIsImV4cCI6MjAzMzQyNTIxMn0.tYS-IdA_UlhtL1M_3wnKOooF5KjDREjxCVbmSI88SkQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;