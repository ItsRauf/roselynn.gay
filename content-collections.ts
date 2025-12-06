import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import rehypeStarryNight from 'rehype-starry-night'

const work = defineCollection({
  name: "work",
  directory: "src/content/work",
  include: "*.mdx",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    url: z.url().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypeStarryNight]
    });
    return {
      ...document,
      mdx,
    };
  },
})

const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "*.mdx",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypeStarryNight]
    });
    return {
      ...document,
      mdx,
    };
  },
})

export default defineConfig({
  collections: [work, projects],
});
