import { AppDataSource } from '../data-source';
import { Subject } from '../entities/Subjects';

export const SubjectRepository = AppDataSource.getRepository(Subject);
