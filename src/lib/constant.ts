export const TOCAMELCASE = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export const convertToMinutes = (timeString: string) => {
  // Split the time string into hours and minutes
  const timeParts = timeString.match(/(\d+)h\s(\d+)min/) || [];

  // Extract hours and minutes from the matched parts
  const hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);

  // Convert hours to minutes and add to the minutes
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
};
