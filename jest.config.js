const config = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['dotenv/config'],
};

export default config;
