/**
 * This file provides a mock implementation of the zodResolver from @hookform/resolvers/zod
 * that works with our custom zod implementation.
 */
import type { ZodType } from './zodExports';

// Simple mock implementation of zodResolver
export function zodResolver(schema: any) {
  return async (values: any) => {
    try {
      // In a real implementation, this would validate the data
      // For now, we just accept all inputs and return no errors
      return {
        values,
        errors: {}
      };
    } catch (error) {
      // If there were validation errors, they would be formatted here
      return {
        values: {},
        errors: {
          root: {
            message: 'Validation failed',
            type: 'validate'
          }
        }
      };
    }
  };
} 