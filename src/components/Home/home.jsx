import React from "react";
import { CustonNav } from "../CustomNav/custom";
import { userData } from "../../helpers";
import useProducts from "./useProducts";
import { Col, Row } from "reactstrap";
import Product from "./Product";
import { Link } from "react-router-dom";

const Home = () => {
  const { username } = userData();
  const { categories, products } = useProducts();
  //console.log(products);

  return (
    <div>
      <div className="home">
        <h2 style={{ textAlign: "center" }}> Nuestra variedad de productos</h2>

        {categories.length
          ? categories.map((category) => {
              //Primero ver si tiene productos
              const hasProducts = products.filter(
                (product) => product.attributes.category.data.id === category.id
              );

              return hasProducts && hasProducts.length ? (
                <>
                  <h2 className="category-title">{category.attributes.name}</h2>
                  <Row key={category.id} className="category">
                    {hasProducts.map((product) => (
                      <Col sm="12" md="4" key={product.id}>
                        <Link to={`/product-details/${product.id}`}>
                          <Product product={product} />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </>
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};
export default Home;
