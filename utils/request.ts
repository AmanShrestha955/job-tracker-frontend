import api from "./api";

export const getData = async <T, U>(
  endpoint: string,
  params: Record<string, T> = {},
): Promise<U> => {
  const res = await api.get<U>(endpoint, { params });
  return res.data;
};

export const postData = async <T, U>(endpoint: string, data: T): Promise<U> => {
  const res = await api.post<U>(endpoint, data);
  return res.data;
};

export const deleteData = async <T>(endpoint: string): Promise<T> => {
  const res = await api.delete<T>(endpoint);
  return res.data;
};

export const updateData = async <T, U>(
  endpoint: string,
  data: T,
): Promise<U> => {
  const res = await api.patch<U>(endpoint, data);
  return res.data;
};
