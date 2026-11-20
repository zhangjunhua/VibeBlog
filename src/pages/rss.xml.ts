import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../site.config';
import { getPublishedPosts } from '../utils/posts';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('RSS 生成需要配置站点地址。');
  }

  const posts = await getPublishedPosts();
  const site = new URL(import.meta.env.BASE_URL, context.site);

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `posts/${post.id}/`,
    })),
    customData: '<language>zh-cn</language>',
  });
}
