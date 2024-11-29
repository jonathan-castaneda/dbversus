FROM node:21.7.3-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
ADD .output /app
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD ["node", "/app/server/index.mjs"]

#sudo docker build -t calderonperaza/dbversusapp:0.2.0 .
#sudo docker build --no-cache -t calderonperaza/dbversusapp:0.2.0 .