import { Request, Response } from 'express';
import { NotFoundError } from '../helpers/api-error';
import { RoomRepository } from '../repositories/room.repository';
import { SubjectRepository } from '../repositories/subject.repository';
import { VideoRepository } from '../repositories/video.repository';
export class RoomController {
  async index(_: Request, res: Response) {
    const data = await RoomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });
    return res.send({ data });
  }
  async create(req: Request, res: Response) {
    const { name, description } = req.body;
    const newRoom = RoomRepository.create({ name, description });
    const data = await RoomRepository.save(newRoom);

    return res.send({ data });
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;
    const room = await RoomRepository.findOneBy({ id: idRoom });
    if (!room) throw new NotFoundError('room not found');

    const block = false;
    const newVideo = VideoRepository.create({ title, url, block, room });
    const data = await VideoRepository.save(newVideo);

    return res.send({ data });
  }

  async subjectRoom(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    const room = await RoomRepository.findOne({
      where: { id: idRoom },
      relations: { subjects: true },
    });
    if (!room) throw new NotFoundError('room not found');

    const subject = await SubjectRepository.findOneBy({ id: subject_id });

    if (!subject) throw new NotFoundError('subject not found');

    const roomUpdate = {
      ...room,
      subjects: [...room.subjects, subject],
    };

    await RoomRepository.save(roomUpdate);

    return res.status(200).send({ room });
  }
  async listOnly(req: Request, res: Response) {
    const { idRoom } = req.params;
    const rooms = await RoomRepository.findOne({
      relations: {
        subjects: true,
        videos: true,
      },
      where: { id: idRoom },
    });
    return res.send({ rooms });
  }
}
