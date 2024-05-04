module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        globals: ['__scanCodes'],
        alias: {
          '@Api': ['./App/Api'],
          '@Components': ['./App/Components'],
          '@Screens': ['./App/Screens'],
          '@Redux': ['./App/Redux'],
          '@Utils': ['./App/Utils'],
        },
      },
    ],
  ],
};
