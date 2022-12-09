import { Router } from 'express';
import { VideoController } from '../controller/Video.Controller';

const controller = new VideoController();

const videoRouter = Router();

videoRouter.get('/', controller.videosEnabled);
videoRouter.get('/all', controller.allVideo);
videoRouter.get('/filter/:name', controller.filter)
videoRouter.get('/:idVideo', controller.show)
videoRouter.patch('/:idVideo', controller.disabledEnabledVideo)

export default videoRouter;
