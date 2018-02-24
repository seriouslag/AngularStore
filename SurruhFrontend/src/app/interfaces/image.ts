import {Tag} from './tag';

export interface Image {
  id: number;
  createdDate: string;
  lastModified: string;
  name: string;
  extension: string;
  tags: Tag[];
  imageId: number;
  isVisible: boolean;
}
