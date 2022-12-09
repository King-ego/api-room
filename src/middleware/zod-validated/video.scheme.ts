import { z } from 'zod';

export const patchVideo = z.object({
  body: z.object({
    block: z.boolean({
      required_error: 'Block is required',
    }),
  }),
});

export const createVideo = z.object({
  body: z.object({
    title: z.string({required_error: "title is required"}),
    url: z.string({required_error: "url is required"})
  })
})


