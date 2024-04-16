import React, { useState, useEffect } from 'react';

export default function useMediaQuery(initialWidth = 0, initialHeight = 0) {
  const [screenWidth, setScreenWidth] = useState({
    width: process.browser ? window.innerWidth : initialWidth,
    height: process.browser ? window.window.innerHeight : initialHeight,
  });

  useEffect(() => {
    function getSize() {
      return {
        width: process.browser ? window.innerWidth : initialWidth,
        height: process.browser ? window.innerHeight : initialHeight,
      };
    }

    function handleResize() {
      setScreenWidth(getSize());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenWidth;
}
