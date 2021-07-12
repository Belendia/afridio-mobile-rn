export default {
  prefixes: ['/'],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'search',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
