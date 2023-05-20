import { FC, FormEvent } from 'react';
import { Param } from 'types/base';
import Slider from './VerticalSlider';
import { ScrollArea } from './HorizontalScrollArea';

interface ParamAreaProps {
  handleParamChange: (name: string, value: number) => void;
  params: Param[];
}

const ParamArea: FC<ParamAreaProps> = ({ handleParamChange, params }) => {
  return (
    <ScrollArea>
      <div className="flex space-x-5">
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="horizontal"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="vertical"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="vertical"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="vertical"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="vertical"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="vertical"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
        {params.map((param, index) => (
          <div key={index} className="w-20 space-y-2">
            <Slider
              orientation="vertical"
              defaultValue={[param.value]}
              min={param.min}
              max={param.max}
              step={param.step}
              onValueChange={(value) => handleParamChange(param.name, value[0])}
            />
            <div className="text-slate-400 text-center">{param.label}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ParamArea;
