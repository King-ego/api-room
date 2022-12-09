import { AppDataSource } from '../data-source';
import { Room } from '../entities/Rooms';

export const RoomRepository = AppDataSource.getRepository(Room);
