import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import BasketCard from "./basketCard";

const Basket = ({ basket, removeFromBasket, updateBasketItem }) => {
  const navigate = useNavigate();
  const navigateToProductView  = (url) => {
    navigate(url);
  };

  const totalPrice = basket.reduce((acc, value) => {
    const itemPrice = Number(value.price) * Number(value.cantidad);
    return acc + itemPrice;
  }, 0);

  return (
    <>
      <div className="basket">
        {basket.length ? <h3>Total a pagar: ${totalPrice}</h3> : null}
        <Row>
          {basket.map((product, idx) => (
            <Col
              sm="12"
              md="3"
              key={`${idx}${product.productId}`}
              onClick={() =>
                navigateToProductView(`/product-details/${product.productId}`)
              }
            >
              <BasketCard
                {...{
                  ...product,
                  index: idx,
                  updateBasketItem,
                  removeFromBasket,
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
      {!basket.length ? (
        <div className="empty-basket">
          <h3>Tu canasta esta vacia</h3>
          <Button
            color="info"
            onClick={() => {
              navigate("/");
            }}
          >
            ir a la tienda
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Basket;
