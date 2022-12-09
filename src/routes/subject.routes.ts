import { Router } from 'express';
import { SubjectController } from '../controller/Subject.Controller';
const subjectRouter = Router();

const controller = new SubjectController()

subjectRouter.get('/', controller.index);
subjectRouter.post('/', controller.create);
subjectRouter.get('/:subjectId', controller.show);
subjectRouter.delete('/:subjectId', controller.delete);
subjectRouter.patch('/:subjectId', controller.update);

export default subjectRouter