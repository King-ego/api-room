import { z } from 'zod';

export const createSubject = z.object({
  body: z.object({
    name: z.string({
      required_error: 'field name is required',
    }),
  }),
});
