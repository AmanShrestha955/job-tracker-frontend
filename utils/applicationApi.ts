import {
  CreateApplicationFormData,
  GetAllApplicationDataParams,
  GetAllApplicationDataResponse,
  getApplicationData,
  Message,
} from "@/types/ApplicationApi";
import { getData, postData, updateData, deleteData } from "./request";

export const getAllApplicationData = async (
  params: GetAllApplicationDataParams,
) => {
  const response = await getData<
    string | number,
    GetAllApplicationDataResponse
  >("/applications", params);
  return response;
};

export const getApplicationByIdData = async (id: number) => {
  const response = await getData<null, getApplicationData>(
    `/applications/${id}`,
  );
  return response;
};

export const createApplication = async (
  formData: CreateApplicationFormData,
) => {
  const response = await postData<CreateApplicationFormData, Message>(
    "/applications",
    formData,
  );
  return response;
};

export const updateApplication = async (
  id: number,
  formData: CreateApplicationFormData,
) => {
  const response = await updateData<CreateApplicationFormData, Message>(
    `/applications/${id}`,
    formData,
  );
  return response;
};

export const deleteApplication = async (id: number) => {
  const response = await deleteData<Message>(`/applications/${id}`);
  return response;
};
