import axios from "axios";

export const api = axios.create({
  baseURL: "https://37.27.113.235:6767",
});

export const loginApi = async (email: string, password: string) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  const res = await api.post("/accounts/login/", formData);

  return res.data;
};

export const registerApi = async (
  email: string,
  name: string,
  password: string,
  password2: string
) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("name", name);
  formData.append("password", password);
  formData.append("password2", password2);

  const res = await api.post("/accounts/register/", formData);

  return res.data;
};