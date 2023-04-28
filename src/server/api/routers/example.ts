import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import productJson from '../../../content/products.json'



export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    getProducts: publicProcedure
      .query(() => {
        return {
          productJson
        };
      }),
});
