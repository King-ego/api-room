import { Router } from 'express';
import { RoomController } from '../controller/Room.Controller';

const controller = new RoomController();

const roomRouter = Router();

roomRouter.get('/', controller.index);
roomRouter.get('/:idRoom', controller.listOnly);
roomRouter.post('/', controller.create);
roomRouter.post('/:idRoom/video', controller.createVideo);
roomRouter.post('/:idRoom/subject', controller.subjectRoom);

export default roomRouter;
