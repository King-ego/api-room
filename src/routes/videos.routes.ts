import { Router } from 'express';
import { VideoController } from '../controller/Video.Controller';
import { patchVideo } from '../middleware/zod-validated/video.scheme';
import { validateMiddlewareRequest } from '../middleware/zod.middleware';

const controller = new VideoController();

const videoRouter = Router();

videoRouter.get('/', controller.videosEnabled);
videoRouter.get('/all', controller.allVideo);
videoRouter.get('/filter/:name', controller.filter);
videoRouter.get('/:idVideo', controller.show);
videoRouter.patch(
  '/:idVideo',
  validateMiddlewareRequest(patchVideo),
  controller.disabledEnabledVideo
);

export default videoRouter;
