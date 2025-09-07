// Design System Tokens for IEEE Vardhaman Student Branch
// Professional and formal color palette with accessibility in mind

export const designTokens = {
  // Primary Colors - IEEE Blue
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main IEEE Blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Secondary Colors - Professional Grays
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    
    // Accent Colors
    accent: {
      success: '#059669', // Professional green
      warning: '#d97706', // Professional orange
      error: '#dc2626',   // Professional red
      info: '#0284c7',    // Professional cyan
    },
    
    // Semantic Colors
    text: {
      primary: '#0f172a',   // Dark slate for main text
      secondary: '#475569', // Medium slate for secondary text
      muted: '#64748b',     // Light slate for muted text
      inverse: '#ffffff',   // White for dark backgrounds
    },
    
    // Background Colors
    background: {
      primary: '#ffffff',   // Pure white
      secondary: '#f8fafc', // Very light slate
      tertiary: '#f1f5f9',  // Light slate
      dark: '#1e293b',      // Dark slate
    },
    
    // Border Colors
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
    }
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },
  
  // Spacing Scale
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    '2xl': '1rem',  // 16px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Professional Layout
  layout: {
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    header: {
      height: '4rem', // 64px
      zIndex: 50,
    },
    
    sidebar: {
      width: '16rem', // 256px
      zIndex: 40,
    }
  }
};

// CSS Custom Properties for consistent theming
export const cssVariables = `
  :root {
    /* Primary Colors */
    --color-primary-50: ${designTokens.colors.primary[50]};
    --color-primary-100: ${designTokens.colors.primary[100]};
    --color-primary-200: ${designTokens.colors.primary[200]};
    --color-primary-300: ${designTokens.colors.primary[300]};
    --color-primary-400: ${designTokens.colors.primary[400]};
    --color-primary-500: ${designTokens.colors.primary[500]};
    --color-primary-600: ${designTokens.colors.primary[600]};
    --color-primary-700: ${designTokens.colors.primary[700]};
    --color-primary-800: ${designTokens.colors.primary[800]};
    --color-primary-900: ${designTokens.colors.primary[900]};
    
    /* Text Colors */
    --color-text-primary: ${designTokens.colors.text.primary};
    --color-text-secondary: ${designTokens.colors.text.secondary};
    --color-text-muted: ${designTokens.colors.text.muted};
    
    /* Background Colors */
    --color-bg-primary: ${designTokens.colors.background.primary};
    --color-bg-secondary: ${designTokens.colors.background.secondary};
    --color-bg-tertiary: ${designTokens.colors.background.tertiary};
    
    /* Border Colors */
    --color-border-light: ${designTokens.colors.border.light};
    --color-border-medium: ${designTokens.colors.border.medium};
    --color-border-dark: ${designTokens.colors.border.dark};
    
    /* Semantic Colors */
    --color-success: ${designTokens.colors.accent.success};
    --color-warning: ${designTokens.colors.accent.warning};
    --color-error: ${designTokens.colors.accent.error};
    --color-info: ${designTokens.colors.accent.info};
  }
`;
