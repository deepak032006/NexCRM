import { clientApi } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  password2: string;
}

export const loginRequest = async (payload: LoginPayload) => {
  const formData = new FormData();

  formData.append("email", payload.email);
  formData.append("password", payload.password);

  const res = await clientApi.post("/accounts/login/", formData);

  return res.data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const formData = new FormData();

  formData.append("email", payload.email);
  formData.append("name", payload.name);
  formData.append("password", payload.password);
  formData.append("password2", payload.password2);

  const res = await clientApi.post("/accounts/register/", formData);

  return res.data;
};