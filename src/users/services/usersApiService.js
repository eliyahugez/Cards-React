import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async user => {
    try {
        const { data } = await axios.post(`${apiUrl}/users/login`, user);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const EditUser = async (id, user) => {
    try {
      const { data } = await axios.put(`${apiUrl}/users/${id}`, user);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };
  
  export const getUserApi = async (id) => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/${id}`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };
  export const getUsersApi = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users`);
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };

export const signup = async normalizedUser => {
    try {
        const { data } = await axios.post(`${apiUrl}/users`, normalizedUser);
        console.log(data);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export const deleteUser = async (_id) => {
  try {
      const { data } = await axios.delete(`${apiUrl}/users/${_id}`);
      return data;
  } catch (error) {
      return Promise.reject(error.message);
  }
}