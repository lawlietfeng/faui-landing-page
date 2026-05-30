export interface ComponentCategory {
  key: string;
  label: string;
  children: string[];
}

// Form 版 registry 中不存在的组件。本站(Form 版)能展示文档但无法渲染。
// 用于在菜单显示 (Full 版) 角标,并在文档顶部插入 banner 提示用户切到 Full 版。
export const FULL_ONLY_COMPONENTS = new Set<string>([
  // 展示
  'card', 'avatar', 'badge', 'list', 'descriptions', 'empty', 'image',
  'qrcode', 'watermark', 'statistic', 'collapse',
  // 反馈
  'timeline', 'steps', 'stepindicator', 'tour',
  // 导航
  'menu', 'tabs', 'pagination', 'dropdown', 'anchor', 'affix', 'floatbutton',
  // 数据展示
  'table', 'tree', 'carousel', 'chart',
]);

export const componentCategories: ComponentCategory[] = [
  {
    key: 'control-flow',
    label: '控制流 Control Flow',
    children: ['condition', 'repeater'],
  },
  {
    key: 'layout',
    label: '布局 Layout',
    children: ['box', 'flex', 'grid', 'space', 'divider'],
  },
  {
    key: 'data-entry',
    label: '数据录入 Data Entry',
    children: [
      'form', 'input', 'textarea', 'select', 'checkbox', 'radio',
      'datepicker', 'inputnumber', 'slider', 'rate', 'cascader',
      'treeselect', 'timepicker', 'colorpicker', 'transfer',
      'autocomplete', 'mentions', 'switch', 'upload', 'segmented',
    ],
  },
  {
    key: 'helpers',
    label: '辅助 Helpers',
    children: [
      'text', 'button', 'icon', 'typography', 'alert', 'modal',
      'drawer', 'spin', 'tooltip', 'popconfirm', 'tag', 'progress',
      'skeleton', 'popover',
    ],
  },
  {
    key: 'display',
    label: '展示 Display',
    children: [
      'card', 'avatar', 'badge', 'list', 'descriptions', 'empty',
      'image', 'qrcode', 'watermark', 'statistic', 'calendar', 'collapse',
    ],
  },
  {
    key: 'feedback',
    label: '反馈 Feedback',
    children: ['timeline', 'steps', 'stepindicator', 'tour'],
  },
  {
    key: 'navigation',
    label: '导航 Navigation',
    children: [
      'menu', 'tabs', 'pagination', 'dropdown',
      'anchor', 'affix', 'floatbutton',
    ],
  },
  {
    key: 'data-view',
    label: '数据展示 Data View',
    children: ['table', 'tree', 'carousel', 'chart'],
  },
];
