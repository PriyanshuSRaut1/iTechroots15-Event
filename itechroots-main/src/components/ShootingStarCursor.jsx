import { useEffect } from "react";

const ShootingStarCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const star = document.createElement("div");
      star.className = "shooting-star";
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 500); // disappear after 500ms
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
};

export default ShootingStarCursor;
