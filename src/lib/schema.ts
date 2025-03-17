/**
 * This file is used to ensure zod is properly bundled during builds.
 * It exports the zod library for use throughout the application.
 * 
 * For Vercel deployment, zod is marked as external in rollupOptions.
 */
import * as z from 'zod';

// Re-export zod
export default z;

// Example schema to ensure the module is properly imported
export const exampleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
}); 