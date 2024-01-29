import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const UserContext = createContext({});

const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [userInfo, setUserInfo] = useState([]);

    const [loadingPage, setLoadingPage] = useState(false);

    const [postList, setPostList] = useState([])

    const navigate = useNavigate();

    const pathName = window.location.pathname;

    useEffect(() => {
        const token = localStorage.getItem("@TOKEN");

        const loadUser = async () => {
            if (token) {
                try {
                    setLoadingPage(true)
                    const { data } = await api.get("/profile", {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              });

                    setUser(data);
                    setUserInfo(data);
                    navigate(pathName);
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoadingPage(false)
                }
            } else {
                return;
            }
        }
    })
}

export { useUserContext, UserProvider }