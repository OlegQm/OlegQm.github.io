import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    category: z.string(),
    summary: z.string(),
    role: z.string(),
    context: z.string(),
    order: z.number(),
    kind: z.enum(['robotics', 'genai', 'agents']),
    technologies: z.array(z.string()),
    focus: z.array(z.string()),
  }),
});

export const collections = { projects };
