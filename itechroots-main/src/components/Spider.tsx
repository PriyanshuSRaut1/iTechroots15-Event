'use client';
import React, { useEffect, useRef } from 'react';
import * as dat from 'dat.gui';
import gsap from 'gsap';

const Spider: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const win = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    const mouse = {
      x: win.w * 0.5,
      y: win.h * 0.5,
      lerpX: win.w * 0.5,
      lerpY: win.h * 0.5,
      stepX: 0,
      stepY: 0,
      oldStepX: 0,
      oldStepY: 0,
      angle: 0,
    };

    const opts = {
      cellSize: 40,
      pawRadius: 94,
      pawHeight: 200,
      pawRandomStep: 0.2,
      bodyHeight: 20,
      spiderOffsetX: 30,
      spiderOffsetY: 40,
      shadowY: 0.3,
      speed: 0.12,
      stop: false,
      jump: 0,
    };

    let cols = 0;
    let rows = 0;

    const lerp = (a: number, b: number, c: number) => (1 - c) * a + c * b;
    const random = (start: number, range: number) =>
      start - range + Math.random() * range * 2;

    const handleResize = () => {
      win.w = window.innerWidth;
      win.h = window.innerHeight;
      canvas.width = win.w;
      canvas.height = win.h;
      cols = Math.round(win.w / opts.cellSize) + 1;
      rows = Math.round(win.h / opts.cellSize) + 1;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const Paws = Array(8).fill(0).map(() => ({ x: win.w / 2, y: win.h / 2 }));

    const clear = () => ctx.clearRect(0, 0, win.w, win.h);

    const walk = () => {
      let ind = 0;
      Array(10)
        .fill(0)
        .forEach((_, i) => {
          const theta = i / 10;
          if (i % 5 === 0) return;

          const x = random(
            mouse.x + cols * 0.5 + opts.pawRadius * Math.sin(theta * Math.PI * 2),
            opts.pawRadius * opts.pawRandomStep
          );
          const y = random(
            mouse.y + rows * 0.5 + opts.pawRadius * Math.cos(theta * Math.PI * 2),
            opts.pawRadius * opts.pawRandomStep
          );

          gsap.to(Paws[ind++], {
            x,
            y,
            duration: opts.speed,
            ease: 'power3.out',
            delay: ((i + 2) % 4) * 0.1,
          });
        });
    };

    const checkStep = () => {
      mouse.stepX = Math.round((mouse.x / win.w) * (cols - 1)) * opts.cellSize;
      mouse.stepY = Math.round((mouse.y / win.h) * (rows - 1)) * opts.cellSize;

      if (mouse.oldStepX !== mouse.stepX || mouse.oldStepY !== mouse.stepY) {
        walk();
      }

      mouse.oldStepX = mouse.stepX;
      mouse.oldStepY = mouse.stepY;
    };

    const drawSpider = () => {
      const x = mouse.lerpX - opts.spiderOffsetX;
      const y = mouse.lerpY - opts.spiderOffsetY;

      // Legs
      Paws.forEach((p) => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + opts.jump);
        const x1 = lerp(x, p.x, 0.5);
        const y1 = lerp(y + opts.jump, p.y - opts.pawHeight, 0.5);
        ctx.quadraticCurveTo(x1, y1, p.x, p.y);
        ctx.stroke();
        ctx.closePath();
      });
    };

    const drawMouse = () => {
      mouse.lerpX = lerp(mouse.lerpX, mouse.x, 0.1);
      mouse.lerpY = lerp(mouse.lerpY, mouse.y, 0.1);

      if (opts.stop) {
        mouse.lerpX = win.w * 0.5;
        mouse.lerpY = win.h * 0.5;
        mouse.x = win.w * 0.5;
        mouse.y = win.h * 0.5;
      }

      checkStep();
    };

    const draw = () => {
      clear();
      drawMouse();
      drawSpider();
      requestAnimationFrame(draw);
    };
    draw();

    // GUI
    const gui = new dat.GUI();
    const f = gui.addFolder('Settings');
    f.add(opts, 'spiderOffsetX', -100, 100, 1);
    f.add(opts, 'spiderOffsetY', -100, 100, 1);
    f.add(opts, 'pawRadius', 0, 100, 1).onChange(walk);
    f.add(opts, 'pawHeight', 0, 200, 1);
    f.add(opts, 'pawRandomStep', 0, 1, 0.1);
    f.add(opts, 'bodyHeight', 0, 100, 1);
    f.add(opts, 'shadowY', 0, 1, 0.1);
    f.add(opts, 'speed', 0, 0.3, 0.01);
    f.add(opts, 'cellSize', 10, 200, 1).onChange(handleResize);
    f.add(opts, 'stop');
    f.close();

    const handleMouseMove = (e: MouseEvent) => {
      if (opts.stop) {
        mouse.x = win.w / 2;
        mouse.y = win.h / 2;
      } else {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    };
    const handleMouseDown = () => {
      if (opts.stop) return;
      gsap.killTweensOf(opts);
      gsap.to(opts, {
        jump: opts.bodyHeight,
        duration: 0.5,
        ease: 'power3.out',
      });
    };
    const handleMouseUp = () => {
      if (opts.stop) return;
      gsap.killTweensOf(opts);
      gsap.to(opts, {
        jump: 0,
        duration: 2,
        ease: 'elastic.out(1.4, 0.1)',
      });
    };

    // The mouse event listeners are now attached to the window,
    // which allows the canvas to react to cursor movement
    // without blocking clicks on elements with higher z-index.
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      gui.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none', // This is the crucial fix
      }}
    />
  );
};

export default Spider;