// DarkModeToggle.js
import React, { useState } from 'react';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className={styles.slider}></span>
      </label>
      <span className={styles.modeText}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
};

export default DarkModeToggle;
