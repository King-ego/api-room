import { Video } from '../entities/Videos';
import { AppDataSource } from '../data-source';

export const VideoRepository = AppDataSource.getRepository(Video);
