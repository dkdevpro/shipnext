import { defineCollection, defineConfig } from '@content-collections/core';
import {
  createMetaSchema,
  createDocSchema
} from '@fumadocs/content-collections/configuration';
import { compileMDX } from "@content-collections/mdx"; 
import { rehypeCode, remarkGfm } from "fumadocs-core/mdx-plugins"; 

async function transformMDX(document) { 
  const body = await compileMDX(context, document, { 
    ...options, 
    remarkPlugins: [remarkGfm], 
    rehypePlugins: [[rehypeCode]], 
  }); 
  return { 
    ...document, 
    body, 
  }; 
} 

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: createDocSchema,
  transform: transformMDX,
});

const metas = defineCollection({
  name: 'meta',
  directory: 'content/blog',
  include: '**/meta.json',
  parser: 'json',
  schema: createMetaSchema,
});

export default defineConfig({
  collections: [posts, metas],
});