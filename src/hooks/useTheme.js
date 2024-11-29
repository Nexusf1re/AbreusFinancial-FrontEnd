import { useCallback } from 'react';

const useTheme = () => {
  const initTheme = useCallback(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return { toggleTheme, initTheme };
};

export default useTheme; 