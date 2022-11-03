const getItem = (key: string) => localStorage.getItem(key);

export const removeItem = (key: string) => localStorage.removeItem(key);

const setItem = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const cloneJSON = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const extractJSON = (key: string) => {
  const value = getItem(key);
  if (value) {
    return cloneJSON(value);
  }
  return value;
};

export const saveJSON = (key: string, value: any) =>
  setItem(key, typeof value === "string" ? value : JSON.stringify(value));
