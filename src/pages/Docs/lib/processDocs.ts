// 加载所有 ./docs/**/*.md (Vite 构建时静态注入),归一成 routes / guides / components 三块。

const markdownModules = import.meta.glob('../../../../docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// 顶层指南的展示顺序与友好标题。未在此列出的指南会按文件名追加到末尾。
export const GUIDE_ORDER: { slug: string; label: string }[] = [
  { slug: 'npm-usage', label: 'NPM 使用指南' },
  { slug: 'form-guide', label: 'Form 表单完整指南' },
  { slug: 'lifecycle-types', label: '生命周期与类型' },
];

// 默认落地页:第一篇有效的指南 slug。如果上线时改顺序,这里也跟着改。
export const DEFAULT_GUIDE_SLUG = 'npm-usage';

export interface DocRoute {
  path: string;
  content: string;
}

export interface GuideItem {
  key: string;
  label: string;
}

export function processDocs(): {
  guideItems: GuideItem[];
  componentDocs: Map<string, string>;
  routes: DocRoute[];
} {
  const guideMap = new Map<string, GuideItem>();
  const componentDocs = new Map<string, string>();
  const routes: DocRoute[] = [];

  for (const filePath in markdownModules) {
    const content = markdownModules[filePath] as string;
    const cleanPath = filePath.replace('../../../../docs/', '').replace('.md', '');
    const segments = cleanPath.split('/');
    const routePath = `/${cleanPath}`;
    routes.push({ path: routePath, content });

    if (segments.length === 1) {
      const slug = segments[0];
      const titled = GUIDE_ORDER.find((g) => g.slug === slug);
      guideMap.set(slug, {
        key: routePath,
        label: titled?.label ?? slug.charAt(0).toUpperCase() + slug.slice(1),
      });
    } else if (segments[0] === 'components') {
      componentDocs.set(segments[1], routePath);
    }
  }

  // 按 GUIDE_ORDER 显式排序,未列出的按字母序追加在后面,避免依赖 import.meta.glob 的迭代顺序。
  const ordered: GuideItem[] = [];
  for (const { slug } of GUIDE_ORDER) {
    const item = guideMap.get(slug);
    if (item) {
      ordered.push(item);
      guideMap.delete(slug);
    }
  }
  const remaining = Array.from(guideMap.values()).sort((a, b) => a.key.localeCompare(b.key));
  const guideItems = [...ordered, ...remaining];

  return { guideItems, componentDocs, routes };
}
