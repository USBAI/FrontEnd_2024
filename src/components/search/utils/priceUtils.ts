export const calculateMonthlyPayment = (price: string): string => {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  const monthlyPayment = numericPrice / 12;
  return `${monthlyPayment.toFixed(2)}/mo`;
};