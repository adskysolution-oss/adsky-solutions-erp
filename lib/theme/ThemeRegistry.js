/**
 * AdSky 25X Theme Registry
 * Converts dynamic branding tokens into runtime CSS variables.
 */

export function hexToRgb(hex) {
  if (!hex) return null;
  // Remove hash if present
  const cleanHex = hex.replace('#', '');
  
  // Parse components
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `${r} ${g} ${b}`;
}

export function generateCSSVariables(config) {
  if (!config) return '';

  const variables = {
    '--primary': hexToRgb(config.primary),
    '--secondary': hexToRgb(config.secondary),
    '--success': hexToRgb(config.success),
    '--danger': hexToRgb(config.danger),
    '--warning': hexToRgb(config.warning),
    '--dark': hexToRgb(config.dark),
    '--light': hexToRgb(config.light),
    '--background': hexToRgb(config.background),
    '--foreground': hexToRgb(config.foreground),
    '--radius': config.radius ? `${config.radius}rem` : null
  };

  return Object.entries(variables)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}
