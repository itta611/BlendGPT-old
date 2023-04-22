import { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { drawWebGLCanvas } from 'utils/drawWebGLCanvas';

interface WebGLCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

const WebGLCanvas: FC<WebGLCanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    drawWebGLCanvas(canvasRef.current, '/dummy.png');
  });

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default WebGLCanvas;
