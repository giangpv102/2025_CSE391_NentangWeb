import { useEffect, useRef } from 'react';

function Starfall() {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const initStars = () => {
      stars.current = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 1.5 + 0.5,
        size: Math.random() * 2 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      stars.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    initStars();
    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default Starfall;
