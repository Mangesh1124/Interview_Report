import axios from "axios";

const api = axios.create({
  baseURL: "https://interview-report-backend.onrender.com",
  withCredentials: true,
});


export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post(
      "/api/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};



export const login = async ({ email, password }) => {
  try {
    const response = await api.post(
      "/api/auth/login",
      { email, password },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};



export const logout = async () => {
  try {
    const response = await api.get("/api/auth/logout", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};



export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
