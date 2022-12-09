import { Request, Response } from 'express';
import { VideoRepository } from '../repositories/video.repository';
export class VideoController {
  async index(_: Request, res: Response) {
    try {
      const query = await VideoRepository.createQueryBuilder('video')
        .select([
          'video.id',
          'video.url',
          'video.title',
          'video.create_at',
          'video.update_at',
        ])
        .leftJoinAndSelect('video.room', 'room_id')
        .orderBy('video.id', 'ASC')
        .getMany();

      return res.send({ data: query });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }
  public async filter(req: Request, res: Response) {
    const { name } = req.params;
    try {
      const query = await VideoRepository.createQueryBuilder('video')
        .where('video.title like :title', { title: `%${name}%` })
        .leftJoinAndSelect('video.room', 'room_id')
        .getMany();
      return res.send({ data: query });
    } catch {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  public async show(req: Request, res: Response) {
    const { idVideo } = req.params;
    try {
      const data = await VideoRepository.createQueryBuilder('video')
        .where('video.id = :id', { id: idVideo })
        .leftJoinAndSelect('video.room', 'room_id')
        .orderBy('video.id','ASC')
        .getOne();
      // ({
      //   where: { id: idVideo },
      //   relations: { room: true },
      // });
      return res.send({ data });
    } catch {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}
