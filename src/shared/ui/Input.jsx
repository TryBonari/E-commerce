import React from 'react';

export const Input = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-ink-2">{label}</label>}
      <input
        className={`h-12 px-4 border rounded-sm bg-white text-base focus:outline-2 focus:outline-blue-400 ${
          error ? 'border-danger' : 'border-line-2'
        }`}
        {...props}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
};
