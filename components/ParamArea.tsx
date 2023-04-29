import { FC } from 'react';
import { Param } from 'types/base';
import Slider from './VerticalSlider';

interface ParamAreaType {
  params: Param[];
}

const ParamArea: FC<ParamAreaType> = ({ params }) => {
  return (
    <div className="flex p-5">
      {params.map((param, index) => (
        <div key={index}>
          <Slider
            orientation="vertical"
            defaultValue={[param.value]}
            min={param.min}
            max={param.max}
            step={param.step}
          />
          <span className="text-white">{param.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ParamArea;
