# Node app
FROM node:12 as build-stage

RUN npm -g install serve npm

RUN rm -rf /usr/src/app/

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN mkdir -p /root/.ssh && chmod 0400 id_rsa && \
  bash -c 'echo "Host gitlab.usonia.io" >> /root/.ssh/config' && \
  bash -c 'echo "    HostName gitlab.usonia.io" >> /root/.ssh/config' && \
  bash -c 'echo "    User git" >> /root/.ssh/config' && \
  bash -c 'echo "    StrictHostKeyChecking no" >> /root/.ssh/config' && \
  bash -c 'echo "    IdentityFile /usr/src/app/id_rsa" >> /root/.ssh/config'

RUN npm install
ENV NODE_ENV development

RUN npm run build

WORKDIR /usr/src/app
# Bundle app source
FROM nginx:alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]