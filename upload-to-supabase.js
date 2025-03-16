// Simple script to upload an article or report to Supabase
// Run this in your browser console when on the site

async function uploadToSupabase(type, data) {
  // Ensure the data has required fields
  if (!data.title || !data.content || !data.category) {
    console.error('Missing required fields: title, content, and category are required');
    return;
  }
  
  // Add timestamps
  const now = new Date().toISOString();
  data.created_at = now;
  data.updated_at = now;
  
  // Generate an ID if not provided
  if (!data.id) {
    data.id = Math.random().toString(36).substring(2, 15);
  }
  
  try {
    const tableName = type === 'article' ? 'articles' : 'reports';
    
    // Get the supabase client from the window context
    // This assumes your app has exposed the supabase client in window.supabase
    const { data: result, error } = await window.supabase
      .from(tableName)
      .upsert(data)
      .select();
    
    if (error) {
      console.error('Error uploading to Supabase:', error);
      return;
    }
    
    console.log(`Successfully uploaded ${type}:`, result);
    return result;
  } catch (error) {
    console.error('Exception occurred:', error);
  }
}

// Example usage:
// 1. Load your JSON file
// 2. Run the following in console:
//    const articleData = { /* paste your JSON here */ };
//    uploadToSupabase('article', articleData);
//
// Or for reports:
//    const reportData = { /* paste your JSON here */ };
//    uploadToSupabase('report', reportData);

// You can also expose this as a global function
window.uploadToSupabase = uploadToSupabase; 