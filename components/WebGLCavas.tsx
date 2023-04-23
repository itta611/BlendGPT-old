import classNames from 'classnames';
import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import { FC, HTMLAttributes, useCallback, useRef } from 'react';

interface WebGLCanvasProps extends HTMLAttributes<HTMLCanvasElement> {}

const WebGLCanvas: FC<WebGLCanvasProps> = ({ className, ...props }) => {
  const canvasDrawer = useCanvasDrawer();
  const canvasElementRef = useRef<HTMLCanvasElement>(null!);
  const canvasCloneElementRef = useRef<HTMLCanvasElement>(null!);
  const handleCanvasSet = useCallback(async () => {
    if (canvasElementRef.current === null || canvasCloneElementRef.current === null) return;
    await canvasDrawer.init(canvasElementRef.current, '/dummy.png');

    canvasDrawer.onDraw(() => {
      const context = canvasCloneElementRef.current.getContext('2d');
      if (context === null) return;

      canvasCloneElementRef.current.width = canvasElementRef.current.width;
      canvasCloneElementRef.current.height = canvasElementRef.current.height;
      context.drawImage(canvasElementRef.current, 0, 0);
    });

    canvasDrawer.draw();
  }, [canvasDrawer]);
  const canvasRef = useCallback(
    (element: HTMLCanvasElement) => {
      canvasElementRef.current = element;
      handleCanvasSet();
    },
    [handleCanvasSet]
  );
  const canvasDinamicShadowRef = useCallback(
    (element: HTMLCanvasElement) => {
      canvasCloneElementRef.current = element;
      handleCanvasSet();
    },
    [handleCanvasSet]
  );

  return (
    <div className="relative">
      <canvas ref={canvasRef} className={className} {...props}></canvas>
      <canvas
        ref={canvasDinamicShadowRef}
        className={classNames(className, 'absolute top-0 blur-lg -z-10')}
        {...props}
      ></canvas>
    </div>
  );
};

export default WebGLCanvas;
