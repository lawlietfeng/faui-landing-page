export interface ComponentCategory {
  key: string;
  label: string;
  children: string[];
}

export const componentCategories: ComponentCategory[] = [
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
      'autocomplete', 'mentions', 'switch', 'upload',
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
];
