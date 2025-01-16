import { z } from "zod";

const newsSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default newsSchema;
