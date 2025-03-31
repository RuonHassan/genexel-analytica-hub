import { supabase, Article, Report } from './supabase';

export const sampleArticles: Omit<Article, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Novel Drug Resistance Pathways in Cancer Treatment',
    content: `
      <p>Recent discoveries in genomic analysis have revealed previously unknown mechanisms of drug resistance in cancer treatment.</p>
      
      <h2>Non-Traditional Resistance Mechanisms</h2>
      <p>Our research has identified several non-mechanism pathways that contribute to treatment resistance, challenging conventional understanding.</p>
      
      <h2>Genomic Markers</h2>
      <p>Advanced sequencing techniques have revealed new genomic markers associated with drug resistance patterns.</p>
      
      <h2>Clinical Implications</h2>
      <p>Understanding these resistance pathways has significant implications for treatment selection and patient outcomes.</p>
      
      <h2>Future Directions</h2>
      <p>Ongoing research continues to uncover new resistance mechanisms and potential therapeutic targets.</p>
    `,
    summary: 'Exploring newly discovered drug resistance pathways and their implications for cancer treatment.',
    category: 'Research',
    slug: 'novel-drug-resistance-pathways',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3'
  },
  {
    title: 'Precision Medicine Through Genomic Analysis',
    content: `
      <p>Genomic analysis is revolutionizing how we approach precision medicine and drug resistance testing.</p>
      
      <h2>Advanced Diagnostics</h2>
      <p>New diagnostic tools enable more precise identification of resistance mechanisms and treatment selection.</p>
      
      <h2>Clinical Applications</h2>
      <p>Implementation of genomic diagnostics in clinical settings is improving patient outcomes.</p>
      
      <h2>Future Developments</h2>
      <p>Emerging technologies promise even more accurate and comprehensive resistance testing capabilities.</p>
      
      <h2>Implementation Challenges</h2>
      <p>Healthcare providers face various challenges in adopting and implementing genomic diagnostic tools.</p>
    `,
    summary: 'How genomic analysis is transforming precision medicine and drug resistance testing.',
    category: 'Clinical',
    slug: 'precision-medicine-genomic-analysis',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3'
  },
  {
    title: 'Emerging Trends in Resistance Testing',
    content: `
      <p>New approaches to resistance testing are changing how we understand and combat drug resistance.</p>
      
      <h2>Advanced Methods</h2>
      <p>Novel testing methods provide deeper insights into resistance mechanisms and pathways.</p>
      
      <h2>Digital Tools</h2>
      <p>Bioinformatics and AI are enhancing our ability to interpret complex resistance patterns.</p>
      
      <h2>Clinical Impact</h2>
      <p>These advances are leading to more effective treatment strategies and better patient outcomes.</p>
      
      <h2>Privacy Considerations</h2>
      <p>As we collect more genomic data, maintaining patient privacy and data security remains crucial.</p>
    `,
    summary: 'Exploring new approaches and technologies in drug resistance testing.',
    category: 'Technology',
    slug: 'trends-resistance-testing',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3'
  }
];

export const sampleReports: Omit<Report, 'id' | 'created_at'>[] = [
  {
    title: 'Drug Resistance Mechanisms Benchmark 2023',
    description: 'A comprehensive analysis of newly identified resistance pathways and their clinical implications.',
    category: 'Research',
    file_url: 'https://pdf-examples.com/sample-report.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Clinical Implementation of Genomic Diagnostics',
    description: 'Best practices for implementing genomic diagnostic tools in clinical settings.',
    category: 'Clinical',
    file_url: 'https://pdf-examples.com/sample-report2.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
  }
];

export async function seedDatabase() {
  // Check if articles already exist
  const { data: existingArticles, error: articlesError } = await supabase
    .from('articles')
    .select('id')
    .limit(1);
    
  if (articlesError) {
    console.error('Error checking existing articles:', articlesError);
    return;
  }
  
  // If no articles exist, seed the database
  if (existingArticles.length === 0) {
    console.log('Seeding articles...');
    
    for (const article of sampleArticles) {
      const { error } = await supabase
        .from('articles')
        .insert([{
          ...article,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
        
      if (error) {
        console.error('Error seeding article:', error);
      }
    }
  }
  
  // Check if reports already exist
  const { data: existingReports, error: reportsError } = await supabase
    .from('reports')
    .select('id')
    .limit(1);
    
  if (reportsError) {
    console.error('Error checking existing reports:', reportsError);
    return;
  }
  
  // If no reports exist, seed the database
  if (existingReports.length === 0) {
    console.log('Seeding reports...');
    
    for (const report of sampleReports) {
      const { error } = await supabase
        .from('reports')
        .insert([{
          ...report,
          created_at: new Date().toISOString()
        }]);
        
      if (error) {
        console.error('Error seeding report:', error);
      }
    }
  }
  
  console.log('Database seeding complete');
} 