import { FC, FormEvent } from 'react';
import { Param } from 'types/base';
import Slider from './VerticalSlider';

interface ParamAreaProps {
  handleParamChange: (name: string, value: number) => void;
  params: Param[];
}

const ParamArea: FC<ParamAreaProps> = ({ handleParamChange, params }) => {
  return (
    <div className="flex">
      {params.map((param, index) => (
        <div key={index}>
          <Slider
            orientation="vertical"
            defaultValue={[param.value]}
            min={param.min}
            max={param.max}
            step={param.step}
            onValueChange={(value) => handleParamChange(param.name, value[0])}
          />
          <span className="text-white">{param.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ParamArea;
