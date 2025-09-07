// Run this in browser console to clear authentication session
localStorage.removeItem('authToken');
sessionStorage.clear();
console.log('Authentication session cleared. Please refresh the page.');
