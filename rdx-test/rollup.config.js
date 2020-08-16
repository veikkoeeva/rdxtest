
import merge from 'deepmerge';
import { injectManifest } from 'rollup-plugin-workbox';
import copy from 'rollup-plugin-copy';
// use createSpaConfig for bundling a Single Page App
import { createBasicConfig } from '@open-wc/building-rollup';
//import OMT from '@surma/rollup-plugin-off-main-thread';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import html from '@open-wc/rollup-plugin-html';
import { terser } from 'rollup-plugin-terser';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';
const outputDir = "dist";
const baseConfig = createBasicConfig({
  // use the outputdir option to modify where files are output
  outputDir: outputDir,
  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,
  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === "true",
  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
  workbox: false
});

export default [
{  
  input: './src/sw.js',
  output: {
    format: 'es',
    dir: outputDir
  },
  plugins: [
    resolve({ browser: true }),
    replace({ 'process.env.NODE_ENV': '"production"' }),
    terser({ output: { comments: false } })
  ]},
  merge(baseConfig,
  {
    // if you use createSpaConfig, you can use your index.html as entrypoint,
    // any <script type="module"> inside will be bundled by rollup
    /* input: './src/index.html',*/
    output: { dir: outputDir },
    // alternatively, you can use your JS as entrypoint for rollup and
    // optionally set a HTML template manually
    // input: './app.js',
    plugins:
    [        
      html({
        name: 'index.html',
        inputPath: 'src/index.html',
      }),
      copy({
        targets: [
          { src: "src/manifest.json", dest: "dist/" },
          { src: "src/*.png", dest: "dist/" }          
        ],
        hook: "buildStart",
        outputFolder: "dist",
        copyOnce: true,
        flatten: false
      }),
      dynamicImportVars(),
      resolve(),
      injectManifest({
        swSrc: 'dist/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist/',
        globPatterns: ['**/*.{html,js,svg,png,json,css,woff2}']
      }),
      replace({ 'process.env.NODE_ENV': '"production"' })
      //OMT()
    ]
  })];
