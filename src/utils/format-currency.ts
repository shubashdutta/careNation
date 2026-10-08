/**
 * Format currency
 * Example: formatCurrency(123456.78, 'en-IN', 'INR') -> "₹1,23,456.78"
 */
export const formatCurrency = (
  amount: number,
  locale: string = "en-US",
  currency: string = "USD"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
