import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  infinite?: boolean;
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  text, 
  delay = 50, 
  infinite = false, 
  className = '' 
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Typing forward
        setCurrentText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        setCurrentText(text.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === text.length) {
        // Finished typing, start deleting if infinite
        if (infinite) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      } else if (isDeleting && currentIndex === 0) {
        // Finished deleting, start typing again
        setIsDeleting(false);
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, text, delay, infinite, isDeleting]);

  return (
    <h4 className={className}>
      {currentText}
      {(infinite || currentIndex < text.length || isDeleting) && (
        <span className="typewriter-cursor">|</span>
      )}
    </h4>
  );
};

export default TypewriterEffect;