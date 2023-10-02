import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Link } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { userData } from "../../helpers";

const CustonNav = ({ basketItems, isLoogedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="custom-nav">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="mr-auto">
          Mbyte
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            {isLoogedIn ? (
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/basket"
                  className="basket-icon-wrapper"
                >
                  <span className="basket-items">{basketItems}</span>
                  <FaShoppingBasket className="basket-icon" />
                </NavLink><NavLink tag={Link} to="/logout">
                  Salir
                </NavLink>
                
              </NavItem>
            ) : (
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Iniciar sesion
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustonNav;
