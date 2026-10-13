import { getCollection } from 'astro:content';

export async function getProjects() {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

export const projectUrl = (id: string) => `/projects/${id}/`;
