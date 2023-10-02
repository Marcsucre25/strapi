import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useBasket = (token) => {
  const [basket, setBasket] = useState([]);
  const [updateBasket, setUpdateBasket] = useState(false);

  useEffect(() => {
    const getBasketData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`http://localhost:1337/api/baskets`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUpdateBasket(false);
        const basketData = data?.map((item) => ({
          ...item.attributes,
          basketItemId: item.id,
        }));
        setBasket(basketData);
      } catch (error) {
        console.log({ error });
      }
    };

    if (!!token) {
      getBasketData();
    }
  }, [token, updateBasket]);

  //funcion para traer los datos
  const addBasket = async ({
    id,
    imageUrl,
    cantidad,
    attributes: { name, price, category, description, cantidad: quantities },
  }) => {
    //para no añadir producto repeitdo
    const isSameProductExistinBasket = basket.filter(
      (product) =>
        Number(product.productId) === Number(id) && product.price == price
    );

    if (!isSameProductExistinBasket.length) {
      try {
        if (!!token) {
          await axios.post(
            "http://localhost:1337/api/baskets",
            {
              data: {
                name,
                price,
                imageUrl,
                description,
                productId: id,
                cantidad: Number(cantidad),
                categoryId: category.data.id,
              },
            },
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          setUpdateBasket(true);
        }
        setBasket([
          ...basket,
          {
            name,
            price,
            imageUrl,
            quantities,
            description,
            productId: id,
            cantidad: Number(cantidad),
            categoryId: category.data.id,
          },
        ]);
        toast.success("Se agrego correctamente al carrito", {
          hideProgressBar: true,
        });
      } catch (error) {
        console.log({ error });
      }
    } else {
      toast.error("no se pudo añadir al carrito", {
        hideProgressBar: true,
      });
    }
  };

  //para actualizar
  const updateBasketItem = async ({
    index,
    imageUrl,
    cantidad,
    productId,
    basketItemId,
  }) => {
    try {
      if (!!token) {
        await axios.put(`http://localhost:1337/api/baskets/${basketItemId}`, {
          data: {
            
            imageUrl,
            cantidad: Number(cantidad),
          },
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUpdateBasket(true);
      } else {
        const updatedBasket = basket.map((item, idx) => {
          if (index === idx && productId === item.productId) {
            return {
              ...item,
              
              imageUrl,
              cantidad: Number(cantidad),
            };
          }
          return item;
        });
        setBasket(updatedBasket);
      }
    } catch (error) {
      console.log({ error });
    }
  };


  //para eliminar el product seleccionado para comprar
  const removeFromBasket = async ({ index, productId, basketItemId }) => {
    try {
      if (!!token) {
        await axios.delete(
          `http://localhost:1337/api/baskets/${basketItemId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        setUpdateBasket(true);
      } else {
        const basketAfterRemovedItem = basket.filter(
          (item, idx) =>
            (item.productId !== productId && index !== idx) ||
            (item.productId === productId && index !== idx)
        );

        setBasket(basketAfterRemovedItem);
      }
    } catch (error) {
      console.log("Remove item error", { error });
    }
  };


  return { basket, addBasket, removeFromBasket, updateBasketItem };
};

export default useBasket;
