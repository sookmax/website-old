const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  // https://stackoverflow.com/a/44096051
  // timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export function getDateString(epoch: number) {
  return new Date(epoch).toLocaleDateString(undefined, {
    ...DATE_FORMAT,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}
