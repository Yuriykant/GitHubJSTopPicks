export function applySystemScheme(): void {
  const systemTheme = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('scheme', systemTheme);
}
