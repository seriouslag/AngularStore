import {BaseEntity} from "./baseEntity";

export interface Image extends BaseEntity {
  id: number;
  height?: number;
  width?: number;
  contentType: string;
  isVisible?: boolean;
}
