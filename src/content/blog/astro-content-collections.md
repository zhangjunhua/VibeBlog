---
title: '用内容集合管理 Markdown 文章'
description: '通过一个简化的例子，了解 Astro 内容集合如何同时保证写作自由与数据结构可靠。'
pubDate: 2026-11-18
tags: ['Astro', 'Web 开发']
---

> 这是一篇用于验证标题、列表、行内代码和代码块样式的示例文章。

写博客时，我们希望 Markdown 文件足够简单；构建网站时，又希望每篇文章都有完整的标题、摘要和日期。内容集合（Content Collections）正是连接这两件事的桥梁。

## 文章只是一个 Markdown 文件

每篇文章以 frontmatter 开始，用来描述文章的元数据：

```yaml
---
title: '文章标题'
description: '一句清楚的摘要'
pubDate: 2026-11-18
tags: ['Astro', 'Web 开发']
---
```

正文仍然使用普通 Markdown。写作者不需要理解页面组件，也不用直接修改 HTML。

## 在构建时检查数据

内容集合可以为这些字段定义规则。比如，标题必须是字符串，日期必须能被解析，标签应当是字符串数组。如果漏掉标题，构建会明确报错，而不是悄悄生成一个不完整的页面。

一个简化的配置如下：

```ts
const blog = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

这里的 `z.coerce.date()` 会把 frontmatter 中的日期转换为日期对象，方便后续排序和格式化。

## 获得可维护的边界

内容、页面和工具函数各自负责一件事：

1. Markdown 文件负责内容；
2. 内容集合负责校验；
3. Astro 页面负责展示；
4. 构建命令负责发现错误。

这种边界让新增文章成为一件低成本的事：复制一个文件、修改元数据、开始写作，然后执行构建检查即可。
