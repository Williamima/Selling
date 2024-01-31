import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useUserContext } from "./UserContext";
import { toast } from "react-toastify";

const ProdContext = createContext({});

const useProdContext = () => useContext(ProdContext);

const ProdProvider = ({ children }) => {
  const { postList, setPostList } = useUserContext();

  const [editProduct, setEditProduct] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("@TOKEN");

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await api.get("/users/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPostList(data.products)
      } catch (error) {
        toast.error("Algo deu errado!", {
            autoClose: 2000,
        }) 
      } 
    };
    getPost()
  }, []);

  const postCreate = async (formData) => {
    try {
        const newPost = { ...formData }

        const { data } = await api.get(`/users/products/${editProduct.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPostList([...postList, data]);
          setIsOpen(false)
    } catch (error) {
        toast.error("Algo deu errado!", {
            autoClose: 2000,
        }) 
    }

    const postUpdate = async (formData) => {
        try {
            const { data } = await api.get(`/users/products/${editProduct.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const newPostList = postList.map((post) => {
                if(post.id === editProduct.id) {
                    return data;
                } else {
                    return products;
                }
                setPostList(newPostList);
                setEditProduct(null)
              })
        } catch (error) {
            toast.error("Algo deu errado!", {
                autoClose: 2000,
            }) 
        }
    }

    const postDelete = async (deleteId) => {
        try {
            const { data } = await api.get(`/users/products/${deleteId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const newPostList = postList.filter(post => post.id !== deleteId)
              setPostList(newPostList)
        } catch (error) {
            toast.error("Algo deu errado!", {
                autoClose: 2000,
            }) 
        }
    }
  }
};

return (
    <ProdContext value={{
        postList,
        setPostList,
        postCreate,
        postUpdate,
        postDelete,
        editProduct,
        setEditProduct,
        setIsOpen,
        isOpen
    }}>
        { children }
    </ProdContext>
)