import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Subject } from './Subjects';
import { Video } from './Videos';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Video, (video) => video.room)
  videos: Video[];

  @ManyToMany(() => Subject, (subject) => subject.rooms)
  subjects: Subject[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
