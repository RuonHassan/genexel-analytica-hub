import { upsertArticle } from '../lib/supabase';

const sampleArticles = [
  {
    title: 'Understanding Drug Resistance Mechanisms',
    content: 'This article explores the role of genomic analysis in identifying drug resistance pathways...',
    description: 'An in-depth look at how genomic analysis reveals resistance mechanisms.',
    thumbnail_url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&q=80&w=800',
    category: 'Research',
  },
  {
    title: 'The Future of Precision Medicine',
    content: 'Genomic diagnostics are set to revolutionize precision medicine...',
    description: 'Exploring the potential impacts of genomic diagnostics on treatment strategies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=800',
    category: 'Technology',
  },
  {
    title: 'Data-Driven Clinical Decision Making',
    content: 'Healthcare providers are increasingly relying on genomic data to drive treatment decisions...',
    description: 'How genomic data analysis is shaping the future of clinical decision making.',
    thumbnail_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    category: 'Clinical',
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