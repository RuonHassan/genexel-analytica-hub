import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase with:', {
  url: supabaseUrl ? 'present' : 'missing',
  key: supabaseAnonKey ? 'present' : 'missing'
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'set' : 'missing',
    key: supabaseAnonKey ? 'set' : 'missing'
  });
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export interface Article {
  id: string;
  title: string;
  content: string;
  description?: string;
  thumbnail_url?: string;
  category: string;
  created_at: string;
  summary?: string;
  slug: string;
  image_url?: string;
}

export interface Report {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  thumbnail_url: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const getArticles = async (): Promise<Article[]> => {
  console.log('Starting getArticles fetch...');
  try {
    console.log('Making Supabase query...');
    const { data, error, status, statusText } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Supabase response:', { 
      hasData: !!data, 
      dataLength: data?.length, 
      status, 
      statusText,
      error: error ? { message: error.message, code: error.code } : null
    });

    if (error) {
      console.error('Supabase error fetching articles:', { error, status });
      throw error;
    }

    if (!data) {
      console.warn('No data returned from Supabase');
      return [];
    }

    // Log each article's basic info for debugging
    console.log('Articles found:', data.map(a => ({ 
      id: a.id, 
      title: a.title?.substring(0, 30), 
      hasContent: !!a.content 
    })));

    // Validate the data structure
    const validArticles = data.filter(article => {
      const isValid = article.id && article.title && article.content;
      if (!isValid) {
        console.warn('Invalid article data:', {
          id: article.id,
          hasTitle: !!article.title,
          hasContent: !!article.content
        });
      }
      return isValid;
    });

    console.log(`Returning ${validArticles.length} valid articles`);
    return validArticles;
  } catch (error) {
    console.error('Unexpected error in getArticles:', error);
    throw error;
  }
};

export const getReports = async (): Promise<Report[]> => {
  const { data: reports, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reports:', error);
    throw new Error('Failed to fetch reports');
  }

  return reports || [];
};

// Helper function to upload image
export async function uploadImage(file: File, bucket: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading to Supabase:', error);
      throw error;
    }

    // Generate a download URL instead of publicUrl
    const { data: downloadData, error: downloadError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiry

    if (downloadError) {
      console.error('Error creating signed URL:', downloadError);
      throw downloadError;
    }

    const signedUrl = downloadData.signedUrl;
    console.log('Generated signed URL:', signedUrl);

    // Also get the public URL as a fallback
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    console.log('Generated public URL:', publicUrl);
    console.log('File path uploaded:', filePath);
    
    return signedUrl || publicUrl;
  } catch (error) {
    console.error('Error in uploadImage function:', error);
    throw error;
  }
}

// Helper function to create a URL-friendly slug
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Helper function to create or update an article
export async function upsertArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'> & { id?: string }) {
  // Generate slug from title if not provided
  const slug = article.slug || createSlug(article.title);
  
  const { data, error } = await supabase
    .from('articles')
    .upsert([
      {
        ...article,
        slug,
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
