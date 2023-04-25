import classNames from 'classnames';
import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import { FC, HTMLAttributes, useCallback, useEffect, useRef } from 'react';

interface WebGLCanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  imageURL: string;
}

const WebGLCanvas: FC<WebGLCanvasProps> = ({ imageURL, className, ...props }) => {
  const canvasDrawer = useCanvasDrawer();
  const canvasElementRef = useRef<HTMLCanvasElement>(null!);
  const canvasCloneElementRef = useRef<HTMLCanvasElement>(null!);
  const handleCanvasSet = useCallback(async () => {
    if (canvasElementRef.current === null || canvasCloneElementRef.current === null) return;
    await canvasDrawer.init(canvasElementRef.current, imageURL);

    canvasDrawer.onDraw(() => {
      const context = canvasCloneElementRef.current.getContext('2d');
      if (context === null) return;

      canvasCloneElementRef.current.width = canvasElementRef.current.width;
      canvasCloneElementRef.current.height = canvasElementRef.current.height;
      context.drawImage(canvasElementRef.current, 0, 0);
    });

    canvasDrawer.draw();
  }, [canvasDrawer, imageURL]);
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

  useEffect(() => {
    return () => {
      canvasDrawer.discardAllCallbacks();
    };
  });

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
