import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

const FloatingScrollToTopButton = ({ showOnPageScroll = true }) => {
  const [isVisible, setIsVisible] = useState(showOnPageScroll);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const checkScrollTop = () => {
      console.log(window.pageYOffset); // Логирование текущей позиции прокрутки
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop); // Очищаем слушатель при размонтировании
  }, []);
  

  return isVisible && (
    <IconButton
      size="small"
      color="primary"
      aria-label="go back to top"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 40,
        right: 40,
        zIndex: 99,
      }}
    >
      <NavigationIcon/>
    </IconButton>
  );
};

export default FloatingScrollToTopButton;
