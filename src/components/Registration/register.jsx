import React, { useState } from "react";
import { Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const initialUser = { email: "", password: "", username: "" };
const Register = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      const url = "http://localhost:1337/api/auth/local/register";
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res) {
          setUser(initialUser);
          navigate('/login');
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <Row className="register">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <h2>Registrar</h2>
        <FormGroup>
          <Label>UserName</Label>
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
        <Button color="primary" onClick={onRegister}>
          Registrarme
        </Button>
      </Col>
    </Row>
  );
};
export default Register;
