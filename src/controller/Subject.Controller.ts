import { Request, Response } from 'express';
import { SubjectRepository } from '../repositories/subject.repository';
export class SubjectController {
  async index(_: Request, res: Response) {
    const data = await SubjectRepository.find();
    return res.json({ data });
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const newSubject = SubjectRepository.create({
      name,
    });
    const data = await SubjectRepository.save(newSubject);
    return res.status(201).json({ data });
  }

  async show(req: Request, res: Response) {
    const { subjectId } = req.params;
    const data = await SubjectRepository.findOneOrFail({
      where: { id: subjectId },
    });
    return res.json({ data });
  }

  async delete(req: Request, res: Response) {
    const { subjectId } = req.params;
    await SubjectRepository.delete(subjectId);
    return res.json({ message: 'Subject remove success' });
  }

  async update(req: Request, res: Response) {
    const { subjectId } = req.params;
    const { name } = req.body;
    await SubjectRepository.update(subjectId, { name });
    return res.json({ message: 'Subject update success' });
  } 
}
