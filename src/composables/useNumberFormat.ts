export function useNumberFormat(locale = 'fr-FR') {
	const formatNumber = (n: number, options = {}) =>
		new Intl.NumberFormat(locale, options).format(n);

	const formatCurrency = (n: number, currency = 'EUR') =>
		formatNumber(n, { style: 'currency', currency });

	return { formatNumber, formatCurrency };
}
