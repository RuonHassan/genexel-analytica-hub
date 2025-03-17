/**
 * This file is used to ensure zod is properly bundled during builds.
 * It exports the zod library for use throughout the application.
 * 
 * Zod is treated as an external dependency and will be loaded from node_modules.
 */
import * as z from 'zod';

// Export both named and default exports to support different import styles
export { z };
export default z;

// Example schema to ensure the module is properly imported
export const exampleSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
}); 