import { Router } from 'express';
import { RoomController } from '../controller/Room.Controller';
import {
  relacionRoomSubject,
  roomCreate,
} from '../middleware/zod-validated/room.schemes';
import { createVideo } from '../middleware/zod-validated/video.scheme';
import { validateRequest } from '../middleware/zod.middleware';

const controller = new RoomController();

const roomRouter = Router();

roomRouter.get('/', controller.index);
roomRouter.get('/:idRoom', controller.listOnly);
roomRouter.post('/', validateRequest(roomCreate), controller.create);
roomRouter.post(
  '/:idRoom/video',
  validateRequest(createVideo),
  controller.createVideo
);
roomRouter.post(
  '/:idRoom/subject',
  validateRequest(relacionRoomSubject),
  controller.subjectRoom
);

export default roomRouter;
