module.exports = {
  apps : [{
    name: "app",
    script: "./src/server.js",
    instances: "max", // abre de acordo com a quantidade de núcleos no servidor
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
