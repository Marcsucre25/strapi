import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const BasketCard = ({
  name,
  price,
  index,
  cantidad,
  imageUrl,
  productId,
  quantities,
  basketItemId,
  removeFromBasket,
  updateBasketItem,
}) => {
  const quantitiesArray = Array.from(Array(Number(quantities || 0)).keys());

  return (
    <Card className="product-card">
      <div className="image-wrapper">
        <CardImg
          top
          width="100%"
          alt={name}
          src={`http://localhost:1337${imageUrl}`}
        />
      </div>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle onClick={(e) => e.stopPropagation()}>
          <FormGroup className="quantity">
            <Label>Cantidad: </Label>
            <Input
              bsSize="sm"
              value={cantidad}
              type="select"
              name="cantidad"
              onChange={({ target: { value } }) => {
                if (value) {
                  updateBasketItem({
                    index,
                    imageUrl,
                    productId,
                    basketItemId,
                    cantidad: Number(value),
                  });
                }
              }}
            >
              {quantitiesArray.map((number) => (
                <option key={number}>{number}</option>
              ))}
            </Input>
          </FormGroup>
        </CardSubtitle>
        <CardSubtitle>
          <strong>Precio:</strong>${price}
        </CardSubtitle>
        <Button
          size="sm"
          color="danger"
          onClick={(e) => {
            e.stopPropagation();
            removeFromBasket({
              basketItemId,
              productId,
              price,
              index,
              cantidad,
            });
          }}
        >Eliminar</Button>
      </CardBody>
    </Card>
  );
};

export default BasketCard;
