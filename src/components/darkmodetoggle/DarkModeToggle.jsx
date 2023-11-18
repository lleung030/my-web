// DarkModeToggle.js
import React, { useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // You can also save the mode preference to localStorage or a user setting.
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        Dark Mode
      </label>
    </div>
  );
};

export default DarkModeToggle;
