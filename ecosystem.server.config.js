module.exports = {
  apps: [{
    name: 'server-hahow-recruit-backend',
    script: 'src/server/main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    kill_timeout: 20000,
    max_memory_restart: '192M',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
