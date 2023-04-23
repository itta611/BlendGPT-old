import { FC, MutableRefObject, ReactNode, createContext, useContext, useRef } from 'react';
import { WebGLCanvasDrawer } from 'utils/WebGLCanvasDrawer';

const canvasDrawerContext = createContext<MutableRefObject<WebGLCanvasDrawer>>(null!);

export const useCanvasDrawer = () => {
  return useContext(canvasDrawerContext).current;
};

interface CanvasDrawerProviderProps {
  children: ReactNode;
}

export const CanvasDrawerProvider: FC<CanvasDrawerProviderProps> = ({ children }) => {
  const canvasDrawerRef = useRef(new WebGLCanvasDrawer());
  return (
    <canvasDrawerContext.Provider value={canvasDrawerRef}>{children}</canvasDrawerContext.Provider>
  );
};
