import { useMemo, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Menu, Input, Button, Alert } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { CopyOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { componentCategories, FULL_ONLY_COMPONENTS } from './componentCategories';

const markdownModules = import.meta.glob('../../../docs/**/*.md', { query: '?raw', import: 'default', eager: true });

// 顶层指南的展示顺序与友好标题。未在此列出的指南会按文件名追加到末尾。
const GUIDE_ORDER: { slug: string; label: string }[] = [
  { slug: 'npm-usage', label: 'NPM 使用指南' },
  { slug: 'form-guide', label: 'Form 表单完整指南' },
  { slug: 'lifecycle-types', label: '生命周期与类型' },
];

// 默认落地页:第一篇有效的指南 slug。如果上线时改顺序,这里也跟着改。
const DEFAULT_GUIDE_SLUG = 'npm-usage';

interface DocRoute {
  path: string;
  content: string;
}

interface GuideItem {
  key: string;
  label: string;
}

const processDocs = () => {
  const guideMap = new Map<string, GuideItem>();
  const componentDocs = new Map<string, string>();
  const routes: DocRoute[] = [];

  for (const filePath in markdownModules) {
    const content = markdownModules[filePath] as string;
    const cleanPath = filePath.replace('../../../docs/', '').replace('.md', '');
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
};

const buildMenuItems = (
  guideItems: GuideItem[],
  componentDocs: Map<string, string>,
  searchQuery: string,
) => {
  const query = searchQuery.toLowerCase().trim();

  const categoryChildren = componentCategories.flatMap((cat) => {
    const items = cat.children
      .filter((name) => componentDocs.has(name))
      .filter((name) => !query || name.includes(query))
      .map((name) => {
        const isFullOnly = FULL_ONLY_COMPONENTS.has(name);
        const baseLabel = name.charAt(0).toUpperCase() + name.slice(1);
        return {
          key: componentDocs.get(name)!,
          label: isFullOnly ? `${baseLabel} (Full 版)` : baseLabel,
        };
      });

    if (items.length === 0) return [];

    return [{
      key: cat.key,
      label: cat.label,
      children: items,
    }];
  });

  const menuItems: NonNullable<MenuProps['items']> = [];

  if (!query) {
    menuItems.push({
      key: 'guides',
      label: '使用指南',
      type: 'group',
      children: guideItems.map((g) => ({ key: g.key, label: g.label })),
    });
  }

  menuItems.push(...categoryChildren);

  return menuItems;
};

// ghcolors 在 @types/react-syntax-highlighter 下被推断成
// `CSSProperties | { [key: string]: CSSProperties }` 联合。运行时它就是 prism 主题字典,
// 但 TS 在严格模式下不肯把联合窄化进 SyntaxHighlighter.style 期望的字典形态,
// 只能 `as any` 跳过。问题在上游 @types,不在我们代码。
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ghcolorsStyle = ghcolors as any;

interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  node?: unknown;
}

const CodeBlock = (props: CodeBlockProps) => {
  // 把 react-markdown 注入的 node 字段从 rest 中剔除,避免泄漏到 DOM
  const { inline, className, children, node, ...rest } = props;
  void node;
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');
  const isJson = match && match[1].toLowerCase() === 'json';

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!inline && match) {
    let formattedContent = codeContent;
    if (isJson) {
      try {
        formattedContent = JSON.stringify(JSON.parse(codeContent), null, 2);
      } catch {
        // keep original
      }
    }

    return (
      <div className="relative my-6">
        <Button
          type="text"
          size="small"
          icon={copied ? <CheckOutlined className="text-green-500" /> : <CopyOutlined className="dark:text-gray-400" />}
          onClick={handleCopy}
          className="!absolute !top-3 !right-3 z-10 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-600 shadow-sm"
        />
        <SyntaxHighlighter
          style={ghcolorsStyle}
          language={match[1]}
          PreTag="div"
          customStyle={{
            borderRadius: '8px',
            padding: '16px',
            paddingTop: '36px',
            margin: 0,
            fontSize: '14px',
            backgroundColor: 'var(--tw-prose-pre-bg, #f6f8fa)',
            border: '1px solid var(--tw-prose-pre-border, #d0d7de)',
          }}
          className="dark:!bg-[#1e1e1e] dark:!border-gray-700"
          {...rest}
        >
          {formattedContent}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400" {...rest}>
      {children}
    </code>
  );
};

const DocViewer = ({ content, componentSlug }: { content: string; componentSlug?: string }) => {
  const isFullOnly = !!componentSlug && FULL_ONLY_COMPONENTS.has(componentSlug);

  return (
    <div className="max-w-[860px] mx-auto py-10 px-6 text-gray-900 dark:text-gray-100 text-base leading-relaxed">
      {isFullOnly && (
        <Alert
          type="warning"
          showIcon
          className="mb-6"
          message="本组件仅 Full 版可用"
          description="本站使用 Form 版 Renderer,只能展示文档。需要实际渲染请改用 @lawlietfeng/faui/full,或在 customComponents 中自行注入。"
        />
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="text-[32px] font-extrabold mb-6 text-gray-900 dark:text-white" {...props} />,
          h2: (props) => <h2 className="text-[24px] font-bold mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white" {...props} />,
          h3: (props) => <h3 className="text-[20px] font-semibold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
          p: (props) => <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />,
          ul: (props) => <ul className="mb-4 pl-6 list-disc text-gray-700 dark:text-gray-300" {...props} />,
          ol: (props) => <ol className="mb-4 pl-6 list-decimal text-gray-700 dark:text-gray-300" {...props} />,
          li: (props) => <li className="mb-2" {...props} />,
          a: (props) => <a className="text-[#1677ff] hover:underline" {...props} />,
          table: (props) => <table className="w-full mb-6 border-collapse" {...props} />,
          th: (props) => <th className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-left font-semibold text-gray-900 dark:text-gray-200" {...props} />,
          td: (props) => <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300" {...props} />,
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const DocNotFound = ({ fallbackPath }: { fallbackPath: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const requested = location.pathname.replace('/docs', '') || '/';

  return (
    <div className="max-w-[860px] mx-auto py-20 px-6 text-center">
      <div className="text-[80px] leading-none font-extrabold text-gray-200 dark:text-gray-700 select-none">
        404
      </div>
      <h1 className="text-[24px] font-bold mt-4 mb-3 text-gray-900 dark:text-white">
        文档不存在
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        没有找到 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-pink-600 dark:text-pink-400">/docs{requested}</code> 这份文档。
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">
        没找到的文档就是没写,写了的文档就能找到,所以找不到的多半就是没写的。
      </p>
      <Button
        type="primary"
        shape="round"
        onClick={() => navigate(`/docs${fallbackPath}`)}
        style={{ backgroundColor: '#0066cc', borderColor: '#0066cc' }}
      >
        返回文档首页
      </Button>
    </div>
  );
};

export default function Docs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { guideItems, componentDocs, routes } = useMemo(() => processDocs(), []);

  const menuItems = useMemo(
    () => buildMenuItems(guideItems, componentDocs, searchQuery),
    [guideItems, componentDocs, searchQuery],
  );

  const defaultPath =
    guideItems.find((g) => g.key === `/${DEFAULT_GUIDE_SLUG}`)?.key
    ?? guideItems[0]?.key
    ?? '';
  const currentPath = location.pathname.replace('/docs', '');
  const selectedKeys = [currentPath === '' || currentPath === '/' ? defaultPath : currentPath];

  const defaultOpenKeys = componentCategories.map((c) => c.key);

  return (
    <div className="flex h-full w-full bg-white dark:bg-[#121212] overflow-hidden pt-16">
      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto bg-white dark:bg-[#121212] flex flex-col">
        <div className="px-4 pt-4 pb-2">
          <Input
            placeholder="搜索组件..."
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg"
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          className="flex-1 border-r-0 py-2 !bg-transparent dark:!text-gray-300"
          items={menuItems}
          onClick={({ key }) => navigate(`/docs${key}`)}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-[#121212]">
        <div className="min-h-[280px]">
          <Routes>
            {routes.map((route) => {
              const segments = route.path.split('/').filter(Boolean);
              const componentSlug = segments[0] === 'components' ? segments[1] : undefined;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<DocViewer content={route.content} componentSlug={componentSlug} />}
                />
              );
            })}
            <Route path="/" element={<Navigate to={`/docs${defaultPath}`} replace />} />
            <Route path="*" element={<DocNotFound fallbackPath={defaultPath} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
