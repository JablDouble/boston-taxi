import { Address } from 'src/app/shared/types';

export interface PositionStackResponse {
  data: Array<Address>;
}

export interface Path {
  start: Address | null;
  end: Address | null;
}
