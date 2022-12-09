import { Router } from 'express';
import videoRouter from './videos.routes';
import subjectRouter from './subject.routes';
import roomRouter from './room.routes';

const routers = Router();

routers.use('/videos', videoRouter)
routers.use('/subjects', subjectRouter)
routers.use('/rooms', roomRouter)

export default routers;
