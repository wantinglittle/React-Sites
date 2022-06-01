const DateFormatter = (value) => {
  if (!value) return value;

  // clean the input for any non-digit values.
  const date = value.replace(/[^\d]/g, "");

  const dateLength = date.length;


  if (dateLength < 3) return date;

  if (dateLength < 5) {
    return `${date.slice(0, 2)}/${date.slice(2)}`;
  }

  return `${date.slice(0, 2)}/${date.slice(
    2,
    4
  )}/${date.slice(4, 8)}`;
}


export default DateFormatter