import React, { useEffect } from 'react';

const SakuraEffect = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const sakura = document.createElement('div');
      sakura.classList.add('sakura');
      sakura.style.left = Math.random() * window.innerWidth + 'px';
      sakura.style.animationDuration = 3 + Math.random() * 5 + 's';
      document.body.appendChild(sakura);

      setTimeout(() => {
        sakura.remove();
      }, 8000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SakuraEffect;
