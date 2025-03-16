const { exec } = require('child_process');

// Set environment variables
process.env.VITE_SUPABASE_URL = 'https://ntkrfmrsquwjncuhvfvs.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50a3JmbXJzcXV3am5jdWh2ZnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNzYxMTMsImV4cCI6MjA1NzY1MjExM30.ycEp8sWfbYgZcB8bfYKPuDQ3nSPBLBsRC-uNL4BUsII';

// Run the TypeScript file using ts-node
exec('ts-node src/scripts/uploadSampleArticles.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
}); 