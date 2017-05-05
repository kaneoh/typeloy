FROM node
RUN npm install -g typescript
RUN npm install -g typings
ADD ./ /opt/typeloy
WORKDIR /opt/typeloy
RUN typings install
RUN tsc
RUN npm link
RUN mkdir /project
WORKDIR /project
ENTRYPOINT ["typeloy"]
