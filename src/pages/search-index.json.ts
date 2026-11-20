import { getPublishedPosts } from '../utils/posts';

export async function GET() {
  const posts = await getPublishedPosts();
  const index = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate.toISOString(),
    tags: post.data.tags,
    content: post.body ?? '',
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
