import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <Container className="text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} MovieDB. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
