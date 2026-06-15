'use client';

import React from 'react';
import clsx from 'clsx';

/*
 * Button Component
 * Flexible button component with multiple variants and sizes
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  isLoading,
  children,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-base rounded-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-brand-primary text-bg-primary hover:bg-brand-secondary',
    secondary: 'bg-neutral-grey text-neutral-white hover:bg-neutral-grey/80',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
    ghost: 'text-brand-primary hover:bg-brand-primary/10',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon && !isLoading && <span className="inline-flex">{leftIcon}</span>}
      {isLoading && <span className="inline-block animate-spin">⏳</span>}
      <span>{children}</span>
      {rightIcon && !isLoading && <span className="inline-flex">{rightIcon}</span>}
    </button>
  );
}
