import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhfbhhmwrzlucjjlyrwr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZmJoaG13cnpsdWNqamx5cndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDgxMTksImV4cCI6MjA1MjY4NDExOX0.VsN5iYvLK7yTdU7IY3S8Npsff1Zj8_X0_s9wcg0L2Bs';

export const supabase = createClient(supabaseUrl, supabaseKey);
