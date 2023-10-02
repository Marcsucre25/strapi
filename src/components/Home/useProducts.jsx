import React, { useEffect, useState } from "react";
import axios from "axios";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const {
                data: {data},
            } = await axios.get("http://localhost:1337/api/categories");
            setCategories(data);
        } catch (error) {
            console.error("se produjo un error");
        }
    };

    const fetchProducts = async () => {
        try {
            const {
                data: {data},
            } = await axios.get("http://localhost:1337/api/products?populate=*");
            setProducts(data);
        } catch (error) {
            console.error("se produjo un error");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return {
        categories,
        products
    };
};

export default useProducts;