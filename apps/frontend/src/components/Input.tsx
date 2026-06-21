'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Input Component
 * Form input with design system styling
 */

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
}

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3.5 py-2.5 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantStyles = {
  outlined: 'border-2 border-neutral-grey focus:border-brand-primary bg-transparent',
  filled: 'border-b-2 border-neutral-grey focus:border-b-brand-primary bg-bg-primary/50',
  standard: 'border-b-2 border-neutral-grey/50 focus:border-b-brand-primary bg-transparent',
};

export function Input({
  label,
  error,
  helperText,
  size = 'md',
  variant = 'outlined',
  className,
  disabled,
  ...props
}: InputProps) {
  const baseStyles = 'w-full rounded-md transition-all duration-base text-neutral-white placeholder-neutral-grey focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-neutral-white">
          {label}
        </label>
      )}
      <input
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          error && 'border-tech-html focus:border-tech-html',
          className
        )}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-xs mt-1 text-tech-html">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs mt-1 text-neutral-grey">{helperText}</p>
      )}
    </div>
  );
}
