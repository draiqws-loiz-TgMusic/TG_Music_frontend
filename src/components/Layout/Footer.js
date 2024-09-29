import React from 'react';
import './Layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Music App. Все права защищены.</p>
    </footer>
  );
};

export default Footer;
