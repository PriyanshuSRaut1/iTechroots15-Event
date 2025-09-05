'use client';
import { useEffect, useRef } from 'react';

const SpiderWeb = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const maxDistance = 120;
    let particles = [];

    class Particle {
      constructor(x = Math.random() * width, y = Math.random() * height) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;
      }
      drawLine(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          const opacity = 1 - dist / maxDistance;
          ctx.strokeStyle = `rgba(255,255,255,${opacity.toFixed(2)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    }

    // Initialize particles
    const initialParticles = 50;
    for (let i = 0; i < initialParticles; i++) {
      particles.push(new Particle());
    }

    let mousePos = { x: null, y: null };
    let followParticle = null;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;

      // Find nearest particle to cursor
      let nearest = null;
      let minDist = maxDistance;
      for (let p of particles) {
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearest = p;
        }
      }
      followParticle = nearest;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add 5 new particles near click position
      for (let i = 0; i < 5; i++) {
        const p = new Particle(
          clickX + (Math.random() - 0.5) * 50,
          clickY + (Math.random() - 0.5) * 50
        );
        particles.push(p);
      }
      // No special linking code needed;
      // drawLine connects them automatically by distance
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        if (p === followParticle && mousePos.x !== null && mousePos.y !== null) {
          // Smooth easing towards mouse
          p.x += (mousePos.x - p.x) * 0.1;
          p.y += (mousePos.y - p.y) * 0.1;
        } else {
          p.update();
        }

        // Draw lines to other particles in range
        for (let j = i + 1; j < particles.length; j++) {
          p.drawLine(particles[j]);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default SpiderWeb;