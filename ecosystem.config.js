module.exports = {
  apps: [
    {
      name: 'nuxt3-template',
      exec_mode: 'cluster',
      instances: '3',
      script: './.output/server/index.mjs',
      cwd: '/www/nuxt/nuxt3-template',
      instance_var: 'INSTANCE_ID',
      env_development: {
        PORT: 3333,
        NODE_ENV: 'development',
        NODE_CONFIG_DIR: '/www/nuxt/nuxt3-template/config/',
      },
      env_production: {
        PORT: 4444,
        NODE_ENV: 'production',
        NODE_CONFIG_DIR: '/www/nuxt/nuxt3-template/config/',
      },
    },
  ],
}
