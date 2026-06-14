export function toggleDarkMode() {
  localStorage.setItem(
    'theme',
    document.documentElement.classList.contains('dark') ? 'light' : 'dark',
  );

  document.documentElement.classList.toggle('dark');
}
