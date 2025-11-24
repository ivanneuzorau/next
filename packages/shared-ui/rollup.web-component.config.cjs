const { withNx } = require('@nx/rollup/with-nx');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');

// Custom rollup config that outputs IIFE format
// We skip TypeScript plugin and use only Babel to avoid declaration file conflicts
const config = withNx(
  {
    main: './src/web-component/standalone.ts',
    outputPath: '../../dist/packages/shared-ui/web-component',
    compiler: 'babel',
    format: ['esm'], // Nx requires this, but we'll override
    outputFileName: 'sk8-pipelines.js',
    assets: [],
    // Don't specify tsConfig to avoid TypeScript plugin being added
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

// Override output to use IIFE format
if (config.output) {
  config.output = Array.isArray(config.output) ? config.output : [config.output];
  config.output = config.output.map((out) => ({
    ...out,
    format: 'iife',
    name: 'SK8Pipelines',
  }));
} else {
  config.output = {
    format: 'iife',
    name: 'SK8Pipelines',
    file: 'sk8-pipelines.js',
  };
}

module.exports = config;

