// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';;

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/tictactoe" className={styles.navLink}>
            Game
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/projects" className={styles.navLink}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
