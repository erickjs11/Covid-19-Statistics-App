export const parseDate = (value) => {
  const date = Number(value).toString();

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return { day, month, year };
};

export const formatDate = (date, separator = "-") => {
  const dateArray = [date.year, date.month, date.day];
  return dateArray.join(separator);
};

const getDateIndex = (date, data) => {
  return data.findIndex((post) => post.date === date);
};

export const getDateRange = (from, to, data) => {
  if (!data || !from || !to) return [];
  if (from > to) return data;
  const newData = [...data];
  newData.reverse();
  const fromIndex = getDateIndex(from, newData);
  const toIndex = getDateIndex(to, newData);
  return newData.slice(fromIndex, toIndex + 1);
};

export const getPostByDate = (date, data) => {
  const tempDate = Number((date || "").replaceAll("-", ""));
  return data.find((post) => post.date === tempDate);
};
