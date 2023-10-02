import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useProductView = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  //para la cantidad de producto
  const handleQuantityChange = ({ target: { value } }) => {
    setSelectedQuantity(value);
  };

  //funcion para la imagen
  const getImage = () => {
    const { attributes } = product;
    const image = attributes.images.data.find((image) =>
      image.attributes.name.includes
    );

    return image?.attributes?.url || "";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:1337/api/products/${productId}?populate=*`
        );
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.log({ error });
      }
    };

    //si el product existe
    if (productId) {
      fetchCategories();
    }
  }, [productId]);

  return {
    product, 
    getImage,
    selectedQuantity,
    handleQuantityChange,
  };
};

export default useProductView;
