export const traits = [
  {
    type: 'select',
    name: 'appName',
    changeProp: true,
    options: [
      { value: 'classic', name: 'Classic' },
      { value: 'graphing', name: 'Graphing' },
    ],
  },
  {
    type: 'select',
    name: 'showAlgebraInput',
    changeProp: true,
    options: [
      { value: true, name: 'true' },
      { value: false, name: 'false' },
    ],
  },
  {
    type: 'select',
    name: 'showMenuBar',
    changeProp: true,
    options: [
      { value: true, name: 'true' },
      { value: false, name: 'false' },
    ],
  },
  {
    type: 'select',
    name: 'showToolBar',
    changeProp: true,
    options: [
      { value: true, name: 'true' },
      { value: false, name: 'false' },
    ],
  },
];
