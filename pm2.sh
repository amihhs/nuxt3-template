#!/bin/sh
pm2 start ecosystem.config.js --env $APP_ENV #启动pm2，$APP_ENV：docker运行时候传入的参数
pm2 logs