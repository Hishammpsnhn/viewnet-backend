import { ObjectId } from 'mongoose';

export interface VideoMetadata {
  id?: ObjectId;
  title: string;
  thumbnailUrl: string;
  movieUrl: string;
  //trailer: string;
  //cast: string[];
  //director: string;
  //language: string;
  description: string;
  //genre: ObjectId;
  genre: string;
  //rating: string;
  //likes: number;
  uploadStatus: 'pending' | 'success' | 'failed';
  releaseDateTime: Date;
  block: boolean;
 // uploadDate: Date;
}
