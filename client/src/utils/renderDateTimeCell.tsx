const renderDateCell = (date: string) =>
  date ? new Date(date)?.toLocaleString() : '-----';

export default renderDateCell;