import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

export default [
  // UMD 格式（浏览器使用）
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/3meta.min.js',
      format: 'umd',
      name: 'ThreeMeta',
      sourcemap: true,
      banner: '/*! 3meta v2.0.0 | MIT License | https://github.com/3metaJun/3meta */'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: undefined,
        module: 'esnext'
      }),
      production && terser({
        compress: { passes: 2 },
        mangle: true,
        format: { comments: false }
      })
    ]
  },

  // ESM 格式（现代浏览器）
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/3meta.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: undefined,
        module: 'esnext'
      }),
      production && terser()
    ]
  }
];

