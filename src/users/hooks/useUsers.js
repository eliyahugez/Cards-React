import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../providers/UserProvider";
import useAxios from "../../cards/hooks/useAxios";
import { getUserApi, EditUser, login, signup, getUsersApi } from "../services/usersApiService";
import { getFromLocalStorage, getUser, removeToken, setTokenInLocalStorage, writeToLocalStorage } from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnackbar } from "../../providers/SnackbarProvider";

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const snack = useSnackbar();
    const { user, setUser, setToken } = useUser();

    useAxios();

    const requestStatus = useCallback(
        (loading, errorMessage, users, user = null) => {
            setLoading(loading);
            setError(errorMessage);
            setUsers(users);
            setUser(user);
        }, [setUser]
    );
    
    
    const handleLogin = useCallback(async (user) => {
    const loginAttempts = getFromLocalStorage("loginAttempts") || 0;
    const loginTime = getFromLocalStorage("lastTimeThatUserTry")
    const hours24Milliseconds = 24 * 60 * 60 * 1000;
    const currentTime = Date.now();
    const timeDifference = currentTime - loginTime;
    const remainingTime = hours24Milliseconds - timeDifference;
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

    if (timeDifference >= hours24Milliseconds) {
      localStorage.removeItem("lastTimeThatUserTry");
      writeToLocalStorage("loginAttempts",0)
    }
    if(loginAttempts < 3){
      try {
          const token = await login(user); 
          setTokenInLocalStorage(token); 
          setToken(token);
          const userFromLocalStorage = getUser();
          requestStatus(false, null, null, userFromLocalStorage);
          navigate(ROUTES.CARDS);
          writeToLocalStorage("loginAttempts",0)
          localStorage.removeItem("lastTimeThatUserTry");
      } catch (error) {
      const updeteloginAttempts =  loginAttempts+1
          requestStatus(false, error, null);
          writeToLocalStorage("loginAttempts",updeteloginAttempts)
          writeToLocalStorage("lastTimeThatUserTry", Date.now())
        
      }
  } else snack(`You try to many times Please try again in ${hours||"24"}:${minutes||"00"} hours `,"warning")  
    }, [navigate, requestStatus]);

    const handleLogout = useCallback(() => {
        removeToken();
        setUser(null);
        navigate(ROUTES.LOGIN)
    }, [setUser]);

    const handleGetUser = useCallback(
        async (id) => {
          try {
            const user = await getUserApi(id);
            requestStatus(false, null, null, user);
            return user;
          } catch (error) {
            requestStatus(false, error, null);
          }
        },
        [requestStatus, handleLogin]
      );
    const handleGetUsers = useCallback(
        async () => {
          try {
            const users = await getUsersApi();
            requestStatus(false, null, users, user);
            return users;
          } catch (error) {
            requestStatus(false, error, null);
          }
        },
        [requestStatus]
      );

    const handleEditUser = useCallback(
        async (id, userFormClient) => {
          try {
            await EditUser(id, userFormClient);
            snack("you update the user successfully", "success");
            navigate(ROUTES.CARDS);
          } catch (error) {
            requestStatus(false, error, null);
          }
        },
        [requestStatus, handleLogin]
      );

    const handleSignup = useCallback(
        async (userFromClient) => {
            try {
                const normalizedUser = normalizeUser(userFromClient);
                await signup(normalizedUser);
                await handleLogin({
                    email: userFromClient.email,
                    password: userFromClient.password,
                });
            } catch (error) {
                requestStatus(false, error, null);
            }
        }, [requestStatus, handleLogin]
    );

    const value = useMemo(
        () => ({
            users, isLoading, error, user,
        }), [users, isLoading, error, user]);

    return {
        handleLogin,
        handleLogout,
        handleSignup,
        handleGetUser,
        handleEditUser,
        useMemo,
        handleGetUsers,
        users,
        isLoading,
        error,
        user,
        value
    }
};

export default useUsers;
