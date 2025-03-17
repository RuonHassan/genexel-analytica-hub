// Polyfill for Node.js global in browser
export default typeof global !== 'undefined' ? global : 
  typeof window !== 'undefined' ? window : 
  typeof self !== 'undefined' ? self : 
  {}; 