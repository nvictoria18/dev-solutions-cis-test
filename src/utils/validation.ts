export const isValidInput = (variant: string, value: string) => {
  if (variant === 'Date') {
    return /^\d{1,2}\/\d{1,2}$/.test(value);
  }
  return /^\d+$/.test(value);
};
