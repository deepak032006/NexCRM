"use server";

import axios from "axios";

const API_URL = "http://37.27.113.235:6767";

export async function loginAction(email: string, password: string) {
  try {
    const formData = new URLSearchParams();

    formData.append("email", email);
    formData.append("password", password);

    const res = await axios.post(
      `${API_URL}/accounts/login/`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        "Login failed",
    };
  }
}

export async function registerAction(
  email: string,
  name: string,
  password: string,
  password2: string
) {
  try {
    const formData = new URLSearchParams();

    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("password2", password2);

    const res = await axios.post(
      `${API_URL}/accounts/register/`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        "Registration failed",
    };
  }
}