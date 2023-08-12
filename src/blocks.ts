import { Editor } from 'grapesjs';
export default (editor: Editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add('geogebra-block', {
    label: 'GGB',
    content: { type: 'geogebra' },
    media: `<svg version="1.1" id="menu-perspectives" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
    y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">

 <path class="st0" d="M433.9,149.9c51,83.5,11.9,200.2-87.3,260.7s-220.7,41.8-271.7-41.7S63,168.7,162.2,108.2
   S382.9,66.4,433.9,149.9z M180.2,139.2c-81.2,49.5-114.3,143.1-74,209.2s138.7,79.4,219.8,29.9s114.3-143.1,74-209.1
   S261.3,89.7,180.2,139.2z"/>
 <path id="_425034160" class="st0" d="M148.4,359.6c30.5,0,55.2,24.7,55.1,55.2c0,30.5-24.7,55.2-55.2,55.1
   c-30.5,0-55.1-24.7-55.1-55.1C93.3,384.4,118,359.7,148.4,359.6C148.4,359.6,148.4,359.6,148.4,359.6z"/>
 <path id="_425304776" class="st0" d="M244.9,42c30.5,0,55.2,24.7,55.2,55.2s-24.7,55.2-55.2,55.2s-55.2-24.7-55.2-55.2c0,0,0,0,0,0
   C189.8,66.7,214.5,42,244.9,42L244.9,42z"/>
 <path id="_427514720" class="st0" d="M435.8,142.4c30.5,0,55.2,24.7,55.2,55.2s-24.7,55.2-55.2,55.2c-30.5,0-55.2-24.7-55.2-55.2
   C380.7,167.1,405.4,142.4,435.8,142.4z"/>
 <path id="_425305280" class="st0" d="M360.3,330.7c30.5,0,55.2,24.7,55.2,55.2c0,30.5-24.7,55.2-55.2,55.2
   c-30.5,0-55.1-24.7-55.2-55.1C305.1,355.4,329.8,330.7,360.3,330.7C360.2,330.7,360.2,330.7,360.3,330.7z"/>
 <path id="_425305280-2" class="st0" d="M76.2,173.7c30.5,0,55.2,24.7,55.2,55.2S106.6,284,76.2,284C45.7,284,21,259.3,21,228.8
   C21,198.4,45.7,173.7,76.2,173.7C76.1,173.7,76.2,173.7,76.2,173.7z"/>
 </svg>`,
  });

  bm.add('observer-block', {
    label: 'Observer',
    content: { type: 'text' },
    media: `<svg enable-background="new -0.258 -0.548 123.547 123.539" viewBox="-0.258 -0.548 123.547 123.539" xmlns="http://www.w3.org/2000/svg">
    <path d="m38.555 18.48h15.688v11.227h-15.688z"/>
    <path d="m71.938,66.918c-1.492,0-2.68-1.203-2.68-2.688v-31.007h23.695l9.992,42.312-.055,2.734v18.695c0,1.445-1.172,2.617-2.609,2.617h-23.047c-1.445,0-2.617-1.172-2.617-2.617v-30.046h-2.484"/>
    <path d="m51.484,66.988c1.484,0 2.688-1.195 2.688-2.688v-31.03h-23.672l-10.008,42.312 .047,2.758v18.703c0,1.438 1.172,2.609 2.609,2.609h23.039c1.461,0 2.633-1.172 2.633-2.609v-30.055h2.469"/>
    <path d="m57.633 33.27h8.133v28.812h-8.133z"/>
    <path d="m69.258 18.48h15.688v11.227h-15.688z"/>
   </svg>
   `,
  });
};
