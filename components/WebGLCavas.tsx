import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import { FC, HTMLAttributes, useEffect, useRef } from 'react';

interface WebGLCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

const WebGLCanvas: FC<WebGLCanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const canvasDrawer = useCanvasDrawer();

  useEffect(() => {
    (async () => {
      await canvasDrawer.init(canvasRef.current, '/dummy.png');
      canvasDrawer.draw();
    })();
    return () => {
      canvasDrawer.discard();
    };
  }, [canvasDrawer]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default WebGLCanvas;
