import { Request, Response } from 'express';
import { SubjectRepository } from '../repositories/subject.repository';
export class SubjectController {
  async index(_: Request, res: Response) {
    try {
      const data = await SubjectRepository.find();
      return res.send({ data });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(402).send({ message: 'name is requered' });

    try {
      const newSubject = SubjectRepository.create({
        name,
      });
      const data = await SubjectRepository.save(newSubject);
      return res.status(201).send({ data });
    } catch (error) {
      return res.status(500).send({ message: 'Error this application' });
    }
  }

  async show(req: Request, res: Response) {
    const { subjectId } = req.params;
    try {
      const data = await SubjectRepository.findOneOrFail({
        where: { id: subjectId },
      });
      return res.send({ data });
    } catch {
      return res.status(404).send({ message: 'Subject do not found' });
    }
  }

  async delete(req: Request, res: Response) {
    const { subjectId } = req.params;
    try {
      await SubjectRepository.delete(subjectId);
      return res.send({ message: 'Subject remove success' });
    } catch {
      return res.status(404).send({ message: 'Subject do not found' });
    }
  }

  async update(req: Request, res: Response) {
    const { subjectId } = req.params;
    const { name } = req.body;
    if (!name) return res.status(402).send({ message: 'name is requered' });
    try {
      await SubjectRepository.update(subjectId, { name });
      return res.send({ message: 'Subject update success' });
    } catch {
      return res.status(404).send({ message: 'Subject do not found' });
    }
  }
}
