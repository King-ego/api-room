import { Request, Response } from 'express';
import { RoomRepository } from '../repositories/room.repository';
import { SubjectRepository } from '../repositories/subject.repository';
import { VideoRepository } from '../repositories/video.repository';
export class RoomController {
  async index(_: Request, res: Response) {
    try {
      const data = await RoomRepository.find({
        relations: {
          subjects: true,
          videos: true,
        },
      });
      return res.send({ data });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
  async create(req: Request, res: Response) {
    const { name, description } = req.body;
    if (!name) return res.status(402).send({ message: 'name is requered' });
    try {
      const newRoom = RoomRepository.create({ name, description });
      const data = await RoomRepository.save(newRoom);

      return res.send({ data });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;
    try {
      const room = await RoomRepository.findOneBy({ id: idRoom });
      if (!room) return res.status(404).send({ message: 'room not found' });

      // const room = { ...existRoom, create_at: undefined, update_at: undefined };
      const newVideo = VideoRepository.create({ title, url, room });
      const data = await VideoRepository.save(newVideo);

      return res.send({ data });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  async subjectRoom(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await RoomRepository.findOne({
        where: { id: idRoom },
        relations: { subjects: true },
      });
      if (!room) return res.status(404).send({ message: 'room not found' });

      const subject = await SubjectRepository.findOneBy({ id: subject_id });

      if (!subject) return res.status(404).send({ message: 'room not found' });

      const roomUpdate = {
        ...room,
        subjects: [...room.subjects, subject],
      };

      await RoomRepository.save(roomUpdate);

      return res.status(200).send({ room });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
  async listOnly(req: Request, res: Response) {
    const { idRoom } = req.params;
    try {
      const rooms = await RoomRepository.findOne({
        relations: {
          subjects: true,
          videos: true,
        },
        where: { id: idRoom },
      });
      return res.send({ rooms });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
}
