import JwtDecode from "jwt-decode";
const TOKEN = "token";

export const setTokenInLocalStorage = (encryptedToken) => localStorage.setItem(TOKEN, encryptedToken);

export const getUser = () => {
    try {
        const user = localStorage.getItem(TOKEN);//localStorage: {token: kjh34kl5h3lk45h345.k3jh45k3j4h5.kjh345kuj3h45}
        return JwtDecode(user); // user: kjh34kl5h3lk45h345.k3jh45k3j4h5.kjh345kuj3h45
    } catch (error) {
        return null;
    }
}

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

export const getFromLocalStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error reading from LocalStorage:", error);
      return null;
    }
  };
  
  export const writeToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to LocalStorage:", error);
    }
  };
  
