const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const path = require('path');

module.exports = {
  input: path.join(__dirname, 'src/web-component/standalone.tsx'),
  output: {
    file: path.join(__dirname, '../../dist/packages/shared-ui/web-component/sk8-pipelines.js'),
    format: 'iife',
    name: 'SK8Pipelines',
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
      ],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    terser(),
  ],
  external: [], // Bundle everything for standalone
};

