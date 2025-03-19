export function getCookie(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function currencyFormat(
  amount: number,
  locales = 'pt-BR',
  currency = 'BRL',
) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
