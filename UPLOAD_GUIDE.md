# Guide: Uploading Articles and Reports to Supabase

This guide provides step-by-step instructions for uploading articles and reports to your Genexel Analytica Hub using the provided templates.

## Method 1: Using the UploadModal in the App (Recommended)

The application has a built-in upload modal that you can use to create new articles and reports.

1. Navigate to your site's Articles or Reports page.
2. Click on the "Upload" button in the hero section.
3. Fill in the form with your article or report details.
4. You can copy and paste content from the template files (genexel-article-example.json or genexel-report-example.json).
5. Click "Submit" to upload.

## Method 2: Using Browser Console (Alternative)

If the upload modal isn't working, you can use the browser console:

1. Open your website in Chrome or Firefox.
2. Navigate to any page on your site.
3. Open the browser's Developer Tools:
   - Chrome: Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)
   - Firefox: Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)
4. Go to the "Console" tab.
5. Copy the entire content of the `upload-to-supabase.js` file.
6. Paste it into the console and press Enter.
7. Load your article data:

```javascript
const articleData = {
  "title": "The Future of Genomic Analysis in Personalized Medicine",
  "summary": "Exploring how advanced genomics and AI are revolutionizing personalized healthcare solutions, with insights into Genexel's latest research findings.",
  "content": "# The Future of Genomic Analysis in Personalized Medicine\n\n## Introduction\n\nGenomics has transformed our understanding of human biology and disease...",
  "category": "Research",
  "thumbnail_url": "https://images.unsplash.com/photo-1530026454774-5914ed848a2b?auto=format&fit=crop&q=80&w=1000"
};

// Then upload it
uploadToSupabase('article', articleData);
```

8. Check the console for confirmation of successful upload.

## Method 3: Using Supabase Dashboard (Direct)

You can also upload directly through the Supabase dashboard:

1. Go to [https://app.supabase.io/](https://app.supabase.io/) and log in.
2. Select your project.
3. Go to "Table Editor" in the left sidebar.
4. Select the "articles" or "reports" table.
5. Click "Insert Row" button.
6. Fill in the form with data from your templates.
7. Click "Save" to add the record.

## Understanding the Templates

### Article Template Fields

- `title`: The title of your article
- `summary`: A brief description (appears in cards and previews)
- `content`: The main content in Markdown format
- `category`: The article category (Research, Analysis, News, etc.)
- `thumbnail_url`: URL to the image used for the article card

### Report Template Fields

- `title`: The title of your report
- `summary`: A brief description 
- `content`: The main content in Markdown format
- `category`: The report category
- `thumbnail_url`: URL to the report cover image
- `price`: Price of the report in dollars
- `pages`: Number of pages in the report

## Troubleshooting

If you encounter issues when uploading:

1. **Check Console Errors**: Look for error messages in the browser console.
2. **Validate JSON**: Ensure your JSON is valid without any syntax errors.
3. **Check Required Fields**: Make sure all required fields (title, content, category) are present.
4. **Image URLs**: Ensure image URLs are accessible and valid.
5. **Authentication**: Make sure you're properly authenticated with Supabase.

## Additional Resources

- For custom thumbnails, you can use image hosting services like Unsplash or Imgur
- To format your Markdown content, you can use online editors like [Markdown Guide](https://www.markdownguide.org/basic-syntax/) or [StackEdit](https://stackedit.io/) 