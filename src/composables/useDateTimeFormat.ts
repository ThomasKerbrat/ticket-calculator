export function useDateTimeFormat(locale = "fr-FR") {
	const formatDateTime = (d: Date, options = {}) =>
		new Intl.DateTimeFormat(locale, options).format(d);

	const formatDate = (d: Date, style = "medium") =>
		formatDateTime(d, { style });

	return { formatDateTime, formatDate };
}
