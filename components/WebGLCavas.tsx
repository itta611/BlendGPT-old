import { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { WebGLCanvasDrawer } from 'utils/WebGLCanvasDrawer';

interface WebGLCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

const WebGLCanvas: FC<WebGLCanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const canvasDrawerRef = useRef<WebGLCanvasDrawer>(null!);

  useEffect(() => {
    (async () => {
      canvasDrawerRef.current = new WebGLCanvasDrawer(canvasRef.current, '/dummy.png');
      await canvasDrawerRef.current.init();
      canvasDrawerRef.current.draw();
    })();
    return () => {
      canvasDrawerRef.current.discard();
    };
  }, []);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default WebGLCanvas;
