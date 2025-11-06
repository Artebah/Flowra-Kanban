module.exports = function (options) {
  return {
    ...options,
    watchOptions: {
      poll: 1000,
    },
  };
};
