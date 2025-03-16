import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type Article = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  summary?: string;
  category: string;
  slug: string;
}

export type Report = {
  id: string;
  title: string;
  file_url: string;
  thumbnail_url?: string;
  created_at: string;
  description?: string;
  category: string;
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to upload image
export async function uploadImage(file: File, bucket: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

// Helper function to create or update an article
export async function upsertArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('articles')
    .upsert([
      {
        ...article,
        updated_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Helper function to create or update a report
export async function upsertReport(report: Omit<Report, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('reports')
    .upsert([
      {
        ...report,
        created_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Fetch all articles
export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Fetch all reports
export async function getReports() {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Delete an article
export async function deleteArticle(id: string) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Delete a report
export async function deleteReport(id: string) {
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', id);

  if (error) throw error;
} 