import { Router } from 'express';
import { RoomController } from '../controller/Room.Controller';
import {
  relacionRoomSubject,
  roomCreate,
} from '../middleware/zod-validated/room.schemes';
import { createVideo } from '../middleware/zod-validated/video.scheme';
import { validateMiddlewareRequest } from '../middleware/zod.middleware';

const controller = new RoomController();

const roomRouter = Router();

roomRouter.get('/', controller.index);
roomRouter.get('/:idRoom', controller.listOnly);
roomRouter.post('/', validateMiddlewareRequest(roomCreate), controller.create);
roomRouter.post(
  '/:idRoom/video',
  validateMiddlewareRequest(createVideo),
  controller.createVideo
);
roomRouter.post(
  '/:idRoom/subject',
  validateMiddlewareRequest(relacionRoomSubject),
  controller.subjectRoom
);

export default roomRouter;
