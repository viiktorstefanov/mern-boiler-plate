export const getStrengthText = (strength: number) => {
  if (strength === 0) return "Very Weak";
  if (strength === 1) return "Weak";
  if (strength === 2) return "Fair";
  if (strength === 3) return "Good";
  return "Strong";
};
