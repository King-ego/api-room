import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity
} from 'typeorm';
import { Room } from './Rooms';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  url: string;

  @Column({default: false, nullable: true})
  block: boolean

  @ManyToOne(() => Room, (room) => room.videos)
  @JoinColumn({name: 'room_id'})
  room: Room;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
