const { withNx } = require('@nx/rollup/with-nx');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');

module.exports = withNx(
  {
    main: './src/web-component/standalone.ts',
    outputPath: '../../dist/packages/shared-ui/web-component',
    tsConfig: './tsconfig.lib.json',
    compiler: 'babel',
    format: ['iife'], // IIFE format for standalone script
    outputFileName: 'sk8-pipelines.js',
    assets: [],
  },
  {
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      terser(),
    ],
    external: [], // Bundle everything for standalone
  }
);

