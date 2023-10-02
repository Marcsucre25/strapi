import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const onLogin = async () => {
    const url = "http://localhost:1337/api/auth/local";
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          setUser(initialUser);
          toast.success("Iniciaste Sesión correctamente", {
            hideProgressBar: true,
          });
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error("Correo o contraseña incorrecta", {
        hideProgressBar: true,
      });
    }
  };

  return (
    <Row className="login">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div>
          <h2>Inicio de sesion</h2>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="identifier"
              value={user.identifier}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormGroup>
          <Button color="primary" onClick={onLogin}>
            Ingresar
          </Button>
          <h6>
            Registrate <Link to="/register"> Aquí </Link>
          </h6>
        </div>
      </Col>
    </Row>
  );
};
export default Login;
