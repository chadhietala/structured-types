import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: ['./src/webview/index.tsx'],
  output: [
    {
      file: 'dist/webview.js',
      name: 'app',
      format: 'iife',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
      browser: true,
    }),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      preventAssignment: true,
    }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    commonjs({
      include: /\/node_modules\//,
    }),
    typescript(),
  ],
};
