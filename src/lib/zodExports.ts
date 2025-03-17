/**
 * This file serves as a central export point for zod functionality.
 * By bundling everything here, we avoid direct imports from 'zod' elsewhere
 * in the codebase, which can cause browser module resolution issues.
 */
import * as zod from 'zod';

// Export the core functionality needed by our forms
export const z = zod.z;

// Export any other zod functionality we need
export const ZodError = zod.ZodError;
export const ZodIssueCode = zod.ZodIssueCode;

export default zod; 