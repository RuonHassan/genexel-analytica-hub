import { upsertArticle } from '../lib/supabase';

const sampleArticles = [
  {
    title: 'Understanding Data Analytics in Education',
    content: 'This article explores the role of data analytics in modern education systems...',
    description: 'An in-depth look at how data analytics is transforming education.',
    thumbnail_url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=800',
    category: 'Education',
  },
  {
    title: 'The Future of AI in Higher Education',
    content: 'Artificial Intelligence is set to revolutionize higher education...',
    description: 'Exploring the potential impacts of AI on higher education.',
    thumbnail_url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=800',
    category: 'Technology',
  },
  {
    title: 'Data-Driven Decision Making in Universities',
    content: 'Universities are increasingly relying on data to drive decisions...',
    description: 'How data-driven decision making is shaping the future of universities.',
    thumbnail_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    category: 'Data Science',
  }
];

async function uploadSampleArticles() {
  for (const article of sampleArticles) {
    try {
      const result = await upsertArticle(article);
      console.log('Uploaded article:', result.title);
    } catch (error) {
      console.error('Error uploading article:', article.title, error);
    }
  }
}

uploadSampleArticles().catch(console.error); 