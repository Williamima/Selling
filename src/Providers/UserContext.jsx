import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

const UserContext = createContext({});

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userInfo, setUserInfo] = useState([]);

  const [loadingPage, setLoadingPage] = useState(false);

  const [postList, setPostList] = useState([]);

  const navigate = useNavigate();

  const pathName = window.location.pathname;

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");

    const loadUser = async () => {
      if (token) {
        try {
          setLoadingPage(true);
          const { data } = await api.get("/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(data);
          setUserInfo(data);
          navigate(pathName);
        } catch (error) {
          toast.error("Algo deu errado!", {
            autoClose: 2000,
          });
        } finally {
          setLoadingPage(false);
        }
      } else {
        return;
      }
    };
    loadUser();
  }, []);

  const userRegister = async (formData) => {
    try {
      const { data } = await api.post("/users", formData);
      navigate("/");

      toast.success("usuario cadastrado com sucesso!");
    } catch (error) {
      toast.error("Algo deu errado!", {
        autoClose: 2000,
      });
    }
  };

  const userLogin = async (formData) => {
    try {
      const { data } = await api.post("/sessions", formData);
      localStorage.setItem("@TOKEN", data.token);
      setUser(data.user);

      navigate("/dashboard");
      toast.success("Login realizado.");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Email ou senha incorretos!", {
          autoClose: 2000,
        });
      }
    }
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    setUser(null);
    navigate("/");
    toast.warn("Deslogando...", {
      autoClose: 2000,
    });
  };

  return (
    <UserContext.Provider value={{user, userRegister, userLogin, userLogout, loadingPage, userInfo, postList, setPostList}}>
        {children}
    </UserContext.Provider>
  )
};

export { useUserContext, UserProvider };
