import React, { useEffect, useState, useRef } from "react";

const MouseTracker = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prev, setPrev] = useState({ x: 0, y: 0 });
  const [circle, setCircle] = useState({ x: 0, y: 0 });
  const [currentScale, setCurrentScale] = useState(0);
  const speed = 0.2;
  let currentAngle = 0;

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
    // console.log({ mouse });
  };
  const mouseLeave = (e) => {
    circlElement.current.style.transform = `translate(${circle.x}px, ${circle.y}px)`;
  };

  const mouseDown = (e) => {
    circlElement.current.style.transform = `translate(${circle.x}px, ${circle.y}px)`;
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", mouseLeave);
    window.addEventListener("mousedown", mouseDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", mouseLeave);
      window.removeEventListener("mousedown", mouseDown);
    };
  }, []);

  useEffect(() => {
    let animationFramId;
    const tick = () => {
      setCircle({
        x: circle.x + (mouse.x - circle.x) * speed,
        y: circle.y + (mouse.y - circle.y) * speed,
      });
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

      const deltaMouseX = mouse.x - prev.x;
      const deltaMouseY = mouse.y - prev.y;
      setPrev({ x: mouse.x, y: mouse.y });

      const mouseVelocity = Math.min(
        Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
        150
      );

      const scaleValue = (mouseVelocity / 150) * 0.5;

      setCurrentScale(currentScale + (scaleValue - currentScale) * speed);

      const scaleTransform = `scale(${1 + currentScale},${1 - currentScale})`;

      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

      if (mouseVelocity > 20) {
        currentAngle = angle;
      }

      const rotateTransform = `rotate(${currentAngle}deg)`;

      if (circlElement.current) {
        circlElement.current.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      }
      window.requestAnimationFrame(tick);
    };
    animationFramId = window.requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(tick);
    };
  }, [mouse]);

  const circlElement = useRef(null);
  return (
    <div>
      <div className="circle" ref={circlElement}></div>
    </div>
  );
};

export default MouseTracker;
