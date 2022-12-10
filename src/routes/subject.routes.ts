import { Router } from 'express';
import { SubjectController } from '../controller/Subject.Controller';
import { createSubject } from '../middleware/zod-validated/subject.schemes';
import { validateMiddlewareRequest } from '../middleware/zod.middleware';

const subjectRouter = Router();

const controller = new SubjectController();

subjectRouter.get('/', controller.index);
subjectRouter.post('/', validateMiddlewareRequest(createSubject), controller.create);
subjectRouter.get('/:subjectId', controller.show);
subjectRouter.delete('/:subjectId', controller.delete);
subjectRouter.patch('/:subjectId', controller.update);

export default subjectRouter;
