import { Request, Response } from 'express';
import { VideoRepository } from '../repositories/video.repository';
export class VideoController {
  async videosEnabled(_: Request, res: Response) {
    try {
      const query = await VideoRepository.createQueryBuilder('video')
        .leftJoinAndSelect('video.room', 'room_id')
        .where('video.block = :block', { block: false })
        .orderBy('video.id', 'ASC')
        .getMany();

      return res.send({ data: query });
    } catch (error) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  public async allVideo(_: Request, res: Response) {
    try {
      const data = await VideoRepository.find({ relations: { room: true } });
      return res.send({ data });
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
        .orderBy('video.id', 'ASC')
        .getOne();
      return res.send({ data });
    } catch {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  public async disabledEnabledVideo(req: Request, res: Response) {
    const { idVideo } = req.params;
    const { block } = req.body;
    // if (block === '') return res.status(402).send({ message: 'Field Requered', block });
    try {
      await VideoRepository.update(idVideo, { block });
      return res.send({ message: `id:${idVideo} Atualizado com sucessp` });
    } catch {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}
