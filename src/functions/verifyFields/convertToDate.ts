export function convertToDate(dateString: string): Date {
  const [day, month, year, hours, minutes, seconds] = dateString.split(/[/: ]/).map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}