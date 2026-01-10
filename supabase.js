import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://qclwmmygyzcajhelinby.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbHdtbXlneXpjYWpoZWxpbmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NTI5OTIsImV4cCI6MjA4MzUyODk5Mn0.m8ZJke9vmJTahYoOCkGn9Hgcmz0vS8CZ2IVkY8MV-lo"
);