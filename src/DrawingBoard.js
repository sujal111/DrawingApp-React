// DrawingBoard.js
import React, { useRef, useState, useEffect } from 'react';

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false); // New state for eraser

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'black'; // Initial drawing color
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
    contextRef.current.strokeStyle = isEraser ? 'black' : 'white'; // Switch between black and white
    contextRef.current.lineWidth = isEraser ? 5 : 30; // Increase line width when erasing for better effect
  };

  return (
    <div>
      <button onClick={toggleEraser}>
        {isEraser ? 'Switch to Draw' : 'Switch to Erase'}
      </button>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        style={{ border: '2px solid black', display: 'block', margin: '20px auto' }}
      />
    </div>
  );
};

export default DrawingBoard;
