import React from "react";
import useProductView from "./useProductView";
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Button,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  FormGroup,
  CardSubtitle,
} from "reactstrap";

const ProductView = ({ addBasket }) => {
  const {
    product,
    getImage,
    description,
    selectedQuantity,
    handleQuantityChange,
  } = useProductView();

  if (!product || !product.attributes) {
    return null;
  }

  const { attributes } = product;
  const quantity = Array.from(Array(Number(attributes.cantidad)).keys());

  return (
    <Card className="product-details">
      <Row>
        <Col sm="12" md="6">
          <CardImg
            left="true"
            top
            width="100%"
            alt=""
            src={`http://localhost:1337${getImage()}`}
          />
        </Col>
        <Col sm="12" md="8">
          <CardBody>
            <CardTitle>{attributes.name}</CardTitle>
            <CardText>{attributes.description}</CardText>
            <CardSubtitle>
              <strong>Price: {attributes.price}</strong>
            </CardSubtitle>
            <CardSubtitle>
              <strong>Stock: {attributes.stock}</strong>
            </CardSubtitle>
            <div>
              <FormGroup className="quantity">
                <strong>
                  <Label>Seleccione cantidad a comprar: </Label>
                </strong>
                <Input
                  value={selectedQuantity}
                  type="select"
                  name="quantity"
                  onChange={handleQuantityChange}
                >
                  {quantity.map((number) => (
                    <option key={number}>{number}</option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <Button
              color="primary"
              onClick={() => {
                addBasket({
                  ...product,
                  description,
                  quantity: selectedQuantity,
                  imageUrl: getImage(),
                });
              }}
            >
              Añadir al carrito
            </Button>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductView;
