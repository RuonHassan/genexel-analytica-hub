import { supabase, Article, Report } from './supabase';

export const sampleArticles: Omit<Article, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'The Impact of AI on Higher Education',
    content: `
      <p>Artificial intelligence is revolutionizing how universities operate and deliver education. From automating administrative tasks to personalizing learning experiences, AI technologies are making significant impacts across campuses worldwide.</p>
      
      <h2>Transforming Administrative Processes</h2>
      <p>Universities are using AI to streamline admissions, financial aid, and other administrative functions, allowing staff to focus on more complex tasks that require human judgment.</p>
      
      <h2>Enhancing Learning Experiences</h2>
      <p>AI-powered adaptive learning platforms can personalize education by identifying knowledge gaps and recommending tailored content based on individual student performance.</p>
      
      <h2>Supporting Student Success</h2>
      <p>Predictive analytics can identify students at risk of falling behind or dropping out, enabling timely interventions and support services.</p>
      
      <h2>Ethical Considerations</h2>
      <p>As institutions adopt AI technologies, they must navigate ethical considerations around data privacy, algorithmic bias, and the appropriate balance between automation and human interaction.</p>
    `,
    summary: 'Exploring how artificial intelligence is transforming educational approaches in universities.',
    category: 'Technology',
    slug: 'impact-ai-higher-education',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3'
  },
  {
    title: 'Data-Driven Decision Making in University Administration',
    content: `
      <p>Universities are increasingly leveraging data analytics to inform strategic decisions and improve operational efficiency.</p>
      
      <h2>Enrollment Management</h2>
      <p>Data analytics helps institutions predict enrollment trends, optimize recruitment strategies, and allocate resources effectively.</p>
      
      <h2>Financial Planning</h2>
      <p>Advanced forecasting models enable universities to anticipate financial challenges and opportunities, leading to more strategic budget allocations.</p>
      
      <h2>Facilities Optimization</h2>
      <p>Space utilization data helps administrators identify underutilized areas and make informed decisions about campus infrastructure development.</p>
      
      <h2>Implementation Challenges</h2>
      <p>Despite the benefits, universities face challenges in data integration, building analytics capabilities, and fostering a data-driven culture among staff.</p>
    `,
    summary: 'How universities are using analytics to improve administrative decisions and strategic planning.',
    category: 'Analytics',
    slug: 'data-driven-decision-making-university-administration',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3'
  },
  {
    title: 'Trends in Student Engagement Metrics',
    content: `
      <p>Understanding and measuring student engagement is critical for improving retention and educational outcomes.</p>
      
      <h2>Beyond Traditional Metrics</h2>
      <p>Universities are moving beyond simple attendance tracking to measure meaningful engagement through learning management system interactions, participation quality, and other behavioral indicators.</p>
      
      <h2>Digital Engagement Tools</h2>
      <p>Mobile apps, interactive content, and gamification are being deployed to increase student participation and provide more data points for analysis.</p>
      
      <h2>Correlating Engagement with Outcomes</h2>
      <p>Research shows strong correlations between specific engagement patterns and academic success, helping institutions identify effective intervention strategies.</p>
      
      <h2>Privacy Considerations</h2>
      <p>As more engagement data is collected, universities must balance the benefits of insight with student privacy and ethical data use.</p>
    `,
    summary: 'Exploring how institutions measure and improve student engagement using advanced analytics.',
    category: 'Student Success',
    slug: 'trends-student-engagement-metrics',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3'
  }
];

export const sampleReports: Omit<Report, 'id' | 'created_at'>[] = [
  {
    title: 'Higher Education Analytics Benchmark 2023',
    description: 'A comprehensive analysis of analytics adoption and impact across UK universities.',
    category: 'Benchmarking',
    file_url: 'https://pdf-examples.com/sample-report.pdf',
    thumbnail_url: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Student Success Prediction Models: Comparative Analysis',
    description: 'Evaluating the effectiveness of different predictive models for identifying at-risk students.',
    category: 'Research',
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