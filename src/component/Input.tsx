import React from 'react';

type Props = {
  label: string;
  fullWidth?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, fullWidth = false, ...props }, ref) => {
  return (
    <div className="relative mt-5">
      <label
        className="text-sm text-gray-400 absolute px-1 bg-white left-2"
        style={{ transform: "translateY(-10px)" }}
      >
        {label}
      </label>
      <input
        className={`${fullWidth ? 'w-full' : 'w-72'} border border-gray-700 rounded-md px-4 h-12 outline-none`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
