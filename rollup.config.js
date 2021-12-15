import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/lib.ts',
  output: [
    {
      name: 'jspsych-overlay',
      file: 'dist/jspsych-overlay.js',
      format: 'es',
    },
  ],
  plugins: [typescript()],
};
