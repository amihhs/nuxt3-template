FROM node:lts-alpine

# 创建容器内的项目存放目录
RUN mkdir -p /www/nuxt/nuxt3-template
WORKDIR /www/nuxt/nuxt3-template

# 复制当前文件夹下的文件到工作目录
COPY . /www/nuxt/nuxt3-template

RUN cd /www/nuxt/nuxt3-template
# 添加权限，防止依赖无法安装
RUN chmod -R 777 *
# 添加执行shell文件权限
RUN chmod u+x pm2.sh

RUN npm i pm2 pnpm@7.5.2 --location=global --registry=https://registry.npmmirror.com
RUN pnpm -v

RUN pnpm install --registry=https://registry.npmmirror.com
RUN pnpm build

RUN ls -l -a

# 容器对外暴露的端口号，要和node项目配置的端口号一致
EXPOSE 3333

# 容器启动时执行的命令
CMD ["./pm2.sh"]

# 构建镜像
# docker build -t test-nuxt3-001:pm2 .

# 运行容器
# docker run -d -p 3333:3333 -e APP_ENV=development test-nuxt3-001:pm2
# docker run -d -p 3000:4444 -e APP_ENV=production test-nuxt3-001:pm2