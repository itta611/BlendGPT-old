export interface Param {
  name: string;
  type: 'float' | 'int';
  value: number;
  min: number;
  max: number;
  step: number;
}

export interface SuccessResponse {
  success: true;
  code: string;
  params: Param[];
}

export interface FailureResponse {
  success: false;
  message: string;
}

export type Response = SuccessResponse | FailureResponse;
