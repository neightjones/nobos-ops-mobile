module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "components": "./src/components",
          "constants": "./src/constants",
          "entities": "./src/entities",
          "screens": "./src/screens",
          "utils": "./src/utils"
        }
      }]
    ],
  };
};
