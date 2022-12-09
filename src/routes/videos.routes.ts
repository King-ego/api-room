import { Router } from 'express';
import { VideoController } from '../controller/Video.Controller';

const controller = new VideoController();

const videoRouter = Router();

videoRouter.get('/', controller.index);
videoRouter.get('/filter/:name', controller.filter)
videoRouter.get('/:idVideo', controller.show)

export default videoRouter;
