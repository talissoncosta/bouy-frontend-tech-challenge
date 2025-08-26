module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    // Support for class properties
    '@babel/plugin-proposal-class-properties',
    // Support for private methods
    '@babel/plugin-proposal-private-methods',
    // Support for private property in object
    '@babel/plugin-proposal-private-property-in-object',
    // Support for optional chaining
    '@babel/plugin-proposal-optional-chaining',
    // Support for nullish coalescing
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  env: {
    test: {
      plugins: [
        // Transform ES modules for Jest
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  },
};
