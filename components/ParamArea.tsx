import { FC, FormEvent } from 'react';
import { Param } from 'types/base';
import Slider from './VerticalSlider';

interface ParamAreaProps {
  handleParamChange: (name: string, value: number) => void;
  params: Param[];
}

const ParamArea: FC<ParamAreaProps> = ({ handleParamChange, params }) => {
  return (
    <div className="flex space-x-2">
      {params.map((param, index) => (
        <div key={index} className="w-16 space-y-2">
          <Slider
            orientation="vertical"
            defaultValue={[param.value]}
            min={param.min}
            max={param.max}
            step={param.step}
            onValueChange={(value) => handleParamChange(param.name, value[0])}
          />
          <div className="text-white">{param.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ParamArea;
