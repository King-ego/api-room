import { Request, Response } from 'express';
import { VideoRepository } from '../repositories/video.repository';
export class VideoController {
  async videosEnabled(_: Request, res: Response) {
    const query = await VideoRepository.createQueryBuilder('video')
      .leftJoinAndSelect('video.room', 'room_id')
      .where('video.block = :block', { block: false })
      .orderBy('video.id', 'ASC')
      .getMany();

    return res.send({ data: query });
  }

  public async allVideo(_: Request, res: Response) {
    const data = await VideoRepository.find({ relations: { room: true } });
    return res.send({ data });
  }

  public async filter(req: Request, res: Response) {
    const { name } = req.params;
    const query = await VideoRepository.createQueryBuilder('video')
      .where('video.title like :title', { title: `%${name}%` })
      .leftJoinAndSelect('video.room', 'room_id')
      .where('video.block = :block', { block: false })
      .getMany();
    return res.send({ data: query });
  }

  public async show(req: Request, res: Response) {
    const { idVideo } = req.params;
    const data = await VideoRepository.createQueryBuilder('video')
      .where('video.id = :id', { id: idVideo })
      .leftJoinAndSelect('video.room', 'room_id')
      .where('video.block = :block', { block: false })
      .orderBy('video.id', 'ASC')
      .getOne();
    return res.send({ data });
  }

  public async disabledEnabledVideo(req: Request, res: Response) {
    const { idVideo } = req.params;
    const { block } = req.body;
    await VideoRepository.update(idVideo, { block });
    return res.send({ message: `id:${idVideo} Atualizado com sucessp` });
  }
}
