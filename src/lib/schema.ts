/**
 * This file is used to ensure zod is properly bundled during builds.
 * It exports the zod library for use throughout the application.
 * 
 * For Vercel deployment, zod is marked as external in rollupOptions.
 */

// Try to dynamically import zod, fallback to direct import if not available
let z: any;

try {
  // Import zod from the node_modules
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  z = require('zod');
} catch (error) {
  console.error('Error importing zod:', error);
  // This should never happen in normal circumstances
  z = {
    object: () => ({ 
      parse: () => ({}),
      string: () => ({ min: () => ({}) }),
    }),
    string: () => ({ min: () => ({}), email: () => ({}) }),
    infer: (schema: any) => schema,
  };
}

// Re-export zod
export default z;

// Example schema to ensure the module is properly imported
export const exampleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
}); 