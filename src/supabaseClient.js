// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bageumwceqjrfvkgommk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2V1bXdjZXFqcmZ2a2dvbW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODQ5MDYsImV4cCI6MjA2NzA2MDkwNn0.RDZz8mTBZbquNO-L3LJjFlWfDWA1vmQYek1VtdsBFjU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
