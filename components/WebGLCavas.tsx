import classNames from 'classnames';
import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import { FC, HTMLAttributes, useCallback, useEffect, useRef } from 'react';
import { Param } from 'types/base';

interface WebGLCanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  params: Param[];
  shader?: string;
  imageURL: string;
  onShaderError: (message: string) => void;
}

const WebGLCanvas: FC<WebGLCanvasProps> = ({
  params,
  shader,
  imageURL,
  onShaderError,
  className,
  ...props
}) => {
  const canvasDrawer = useCanvasDrawer();
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const canvasDinamicShadowRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    (async () => {
      if (canvasRef.current === null || canvasDinamicShadowRef.current === null) return;
      await canvasDrawer.init(canvasRef.current, imageURL);

      canvasDrawer.onDraw(() => {
        const context = canvasDinamicShadowRef.current.getContext('2d');
        if (context === null) return;

        canvasDinamicShadowRef.current.width = canvasRef.current.width;
        canvasDinamicShadowRef.current.height = canvasRef.current.height;
        context.drawImage(canvasRef.current, 0, 0);
      });

      canvasDrawer.draw();
    })();

    return () => {
      canvasDrawer.discardAllCallbacks();
    };
  }, [imageURL, canvasDrawer]);

  useEffect(() => {
    params.forEach((param) => {
      canvasDrawer.updateUniformVariable(param.name, param.value);
    });
    canvasDrawer.draw();
  }, [params, canvasDrawer]);

  useEffect(() => {
    if (!shader) return;
    try {
      canvasDrawer.updateFragmentShader(shader);
    } catch (e: unknown) {
      if (e instanceof Error) {
        onShaderError(e.message);
      }
    }
  }, [shader, canvasDrawer, onShaderError]);

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
