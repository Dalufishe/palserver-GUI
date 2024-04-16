import { twMerge } from 'tailwind-merge';

const cn = (...args) => {
  return twMerge(...args);
};

export { cn };
