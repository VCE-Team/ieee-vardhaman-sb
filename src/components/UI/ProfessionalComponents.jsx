import React from 'react';

// Professional Button Component
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false, 
  loading = false,
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
    secondary: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
    outline: 'bg-transparent text-slate-600 border border-slate-300 hover:border-blue-600 hover:text-blue-600 focus:ring-blue-500',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2.5 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-xl'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:transform-none';
  
  return (
    <button
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabled || loading ? disabledClasses : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

// Professional Card Component
export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md border border-slate-200 
        ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl ${className}`} {...props}>
    {children}
  </div>
);

// Professional Input Component
export const Input = ({ 
  label, 
  error, 
  helper, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 border rounded-lg text-slate-900 placeholder-slate-500 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helper && !error && <p className="text-sm text-slate-500">{helper}</p>}
    </div>
  );
};

// Professional Textarea Component
export const Textarea = ({ 
  label, 
  error, 
  helper, 
  required = false,
  className = '',
  rows = 4,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full px-4 py-3 border rounded-lg text-slate-900 placeholder-slate-500 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helper && !error && <p className="text-sm text-slate-500">{helper}</p>}
    </div>
  );
};

// Professional Select Component
export const Select = ({ 
  label, 
  error, 
  helper, 
  required = false,
  children,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 border rounded-lg text-slate-900 bg-white appearance-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helper && !error && <p className="text-sm text-slate-500">{helper}</p>}
    </div>
  );
};

// Professional Badge Component
export const Badge = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-slate-100 text-slate-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <span
      className={`
        inline-flex items-center rounded-full font-semibold
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

// Professional Alert Component
export const Alert = ({ 
  variant = 'info', 
  title,
  children, 
  className = '',
  onClose,
  ...props 
}) => {
  const variants = {
    success: 'bg-green-50 border-green-500 text-green-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  };
  
  const iconMap = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ'
  };
  
  return (
    <div
      className={`
        p-4 rounded-lg border-l-4 relative
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-lg">{iconMap[variant]}</span>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-semibold mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-lg hover:opacity-75"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Professional Loading Component
export const Loading = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };
  
  return (
    <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]} ${className}`} />
  );
};

// Professional Modal Component
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'md',
  className = '' 
}) => {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`
            relative bg-white rounded-xl shadow-xl w-full 
            ${maxWidths[maxWidth]} ${className}
          `}
        >
          {title && (
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ×
              </button>
            </div>
          )}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Professional Section Container
export const Section = ({ children, className = '', ...props }) => (
  <section className={`py-16 lg:py-24 ${className}`} {...props}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

// Professional Page Header
export const PageHeader = ({ 
  title, 
  subtitle, 
  children, 
  className = '',
  centered = true 
}) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
      {title}
    </h1>
    {subtitle && (
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
        {subtitle}
      </p>
    )}
    {children}
  </div>
);
