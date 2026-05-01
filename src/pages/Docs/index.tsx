/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import { Menu, Input, Button } from 'antd';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { CopyOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { componentCategories } from './componentCategories';

const markdownModules = import.meta.glob('../../../docs/**/*.md', { query: '?raw', import: 'default', eager: true });

interface DocRoute {
  path: string;
  content: string;
}

interface GuideItem {
  key: string;
  label: string;
}

const processDocs = () => {
  const guideItems: GuideItem[] = [];
  const componentDocs = new Map<string, string>();
  const routes: DocRoute[] = [];

  for (const filePath in markdownModules) {
    const content = markdownModules[filePath] as string;
    const cleanPath = filePath.replace('../../../docs/', '').replace('.md', '');
    const segments = cleanPath.split('/');
    const routePath = `/${cleanPath}`;
    routes.push({ path: routePath, content });

    if (segments.length === 1) {
      const fileName = segments[0];
      const title = fileName.charAt(0).toUpperCase() + fileName.slice(1);
      guideItems.push({ key: routePath, label: title });
    } else if (segments[0] === 'components') {
      componentDocs.set(segments[1], routePath);
    }
  }

  return { guideItems, componentDocs, routes };
};

const buildMenuItems = (
  guideItems: GuideItem[],
  componentDocs: Map<string, string>,
  searchQuery: string,
) => {
  const query = searchQuery.toLowerCase().trim();

  const categoryChildren = componentCategories.map((cat) => {
    const items = cat.children
      .filter((name) => componentDocs.has(name))
      .filter((name) => !query || name.includes(query))
      .map((name) => ({
        key: componentDocs.get(name)!,
        label: name.charAt(0).toUpperCase() + name.slice(1),
      }));

    if (items.length === 0) return null;

    return {
      key: cat.key,
      label: cat.label,
      children: items,
    };
  }).filter(Boolean);

  const menuItems: any[] = [];

  if (!query) {
    menuItems.push({
      key: 'guides',
      label: '使用指南',
      type: 'group' as const,
      children: guideItems,
    });
  }

  menuItems.push(...categoryChildren);

  return menuItems;
};

const CodeBlock = ({ inline, className, children, ...props }: any) => {
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
          style={ghcolors as any}
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
          {...props}
        >
          {formattedContent}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400" {...props}>
      {children}
    </code>
  );
};

const DocViewer = ({ content }: { content: string }) => {
  return (
    <div className="max-w-[860px] mx-auto py-10 px-6 text-gray-900 dark:text-gray-100 text-base leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-[32px] font-extrabold mb-6 text-gray-900 dark:text-white" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-[24px] font-bold mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-[20px] font-semibold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />,
          ul: ({ node, ...props }) => <ul className="mb-4 pl-6 list-disc text-gray-700 dark:text-gray-300" {...props} />,
          ol: ({ node, ...props }) => <ol className="mb-4 pl-6 list-decimal text-gray-700 dark:text-gray-300" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          a: ({ node, ...props }) => <a className="text-[#1677ff] hover:underline" {...props} />,
          table: ({ node, ...props }) => <table className="w-full mb-6 border-collapse" {...props} />,
          th: ({ node, ...props }) => <th className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-left font-semibold text-gray-900 dark:text-gray-200" {...props} />,
          td: ({ node, ...props }) => <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300" {...props} />,
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
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

  const defaultPath = guideItems.length > 0 ? guideItems[0].key : '';
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
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<DocViewer content={route.content} />}
              />
            ))}
            <Route path="/" element={<Navigate to={`/docs${defaultPath}`} replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
