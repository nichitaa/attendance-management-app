export const msToTime = (ms: number): string => {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (parseInt(seconds) < 60) return seconds + ' Sec';
  else if (parseInt(minutes) < 60) return minutes + ' Min';
  else if (parseInt(hours) < 24) return hours + ' Hrs';
  else return days + ' Days';
};


export const msToHours = (ms: number): number => {
  let hours = (ms / (1000 * 60 * 60)).toFixed(9);
  return parseFloat(hours);
}
