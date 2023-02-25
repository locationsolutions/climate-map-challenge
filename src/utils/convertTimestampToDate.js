function convertTimestampToDate(timestamp, locale, options = []) {
  const date = new Date(timestamp);
  const localeOptions =
    options === []
      ? {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          day: "2-digit",
          month: "numeric",
          year: "numeric",
        }
      : options;

  return date.toLocaleString(locale, localeOptions);
}

export default convertTimestampToDate;
