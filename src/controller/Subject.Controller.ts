import { Request, Response } from 'express';
import { SubjectRepository } from '../repositories/subject.repository';
export class SubjectController {
  async index(_: Request, res: Response) {
    const data = await SubjectRepository.find();
    return res.send({ data });
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const newSubject = SubjectRepository.create({
      name,
    });
    const data = await SubjectRepository.save(newSubject);
    return res.status(201).send({ data });
  }

  async show(req: Request, res: Response) {
    const { subjectId } = req.params;
    const data = await SubjectRepository.findOneOrFail({
      where: { id: subjectId },
    });
    return res.send({ data });
  }

  async delete(req: Request, res: Response) {
    const { subjectId } = req.params;
    await SubjectRepository.delete(subjectId);
    return res.send({ message: 'Subject remove success' });
  }

  async update(req: Request, res: Response) {
    const { subjectId } = req.params;
    const { name } = req.body;
    await SubjectRepository.update(subjectId, { name });
    return res.send({ message: 'Subject update success' });
  } 
}
