module.exports = {
  apps : [
    {
    name: "BestCCBotApp",
    script: "./src/bot.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }
  ],
};
