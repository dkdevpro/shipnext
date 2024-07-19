import { allPosts, allMetas } from 'content-collections';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from '@fumadocs/content-collections';

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/blog',
  source: createMDXSource(allPosts, allMetas),
});