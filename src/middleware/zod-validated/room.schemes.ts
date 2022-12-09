import { z } from 'zod';

export const relacionRoomSubject = z.object({
  body: z.object({
    subject_id: z.string({ required_error: 'Requerid subject id' }),
  }),
});

export const roomCreate = z.object({
  body: z.object({
    name: z.string({ required_error: 'Requerid field name' }),
    description: z
      .string({ required_error: 'Requerid field description' })
      .nullable()
  }),
});
