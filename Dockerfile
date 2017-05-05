FROM node
RUN npm install -g typescript
RUN npm install -g typings
RUN curl https://install.meteor.com/ | sh
ADD ./bin /opt/typeloy/bin
ADD ./scripts /opt/typeloy/scripts
ADD ./src /opt/typeloy/src
ADD ./templates /opt/typeloy/templates
ADD ./tests /opt/typeloy/tests
ADD ./tools /opt/typeloy/tools
ADD ./typings /opt/typeloy/typings
ADD ./package.json /opt/typeloy/package.json
ADD ./tsconfig.json /opt/typeloy/tsconfig.json
ADD ./typings.json /opt/typeloy/typings.json
WORKDIR /opt/typeloy
RUN typings install
RUN tsc
RUN npm link
RUN mkdir /project
WORKDIR /project
ENTRYPOINT ["typeloy"]
