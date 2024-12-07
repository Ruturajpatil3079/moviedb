import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../Services/movieSlice';

const NavbarComponent = ({ onSearch }) => {
  let location = useLocation()
  const [searchQuery, setSearchQueryState] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchQueryState(e.target.value);
    dispatch(setSearchQuery(e.target.value)); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchQuery));
  };
  
  return (
    <div>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
        <Navbar.Brand><img style={{ width: "35px" }} src="/multimedia.png"></img></Navbar.Brand>
          <Navbar.Brand className="navbar-brand-link">MovieDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto navbar-links">
              <Nav.Link as={Link} to="/" className={`navbar-link ${location.pathname === "/" ? "active": ""}`}>
                Popular
              </Nav.Link>
              <Nav.Link as={Link} to="/top-rated" className={`navbar-link ${location.pathname === "/top-rated" ? "active": ""}`}>
                Top Rated
              </Nav.Link>
              <Nav.Link as={Link} to="/upcoming" className={`navbar-link ${location.pathname === "/upcoming" ? "active": ""}`}>
                Upcoming
              </Nav.Link>
            </Nav>
            <Form onSubmit={handleSearchSubmit}>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="search"
                    placeholder="Search Movies"
                    className="mr-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange} 
                  />
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
