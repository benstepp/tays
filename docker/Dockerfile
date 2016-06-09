FROM node
MAINTAINER Benjamin Stepp <me@benstepp.com>
ENV NPM_CONFIG_LOGLEVEL=warn

RUN mkdir /tays
WORKDIR /tays

ADD package.json /tays
RUN npm install

VOLUME /tays
VOLUME /tays/node_modules

CMD /tays/node_modules/.bin/mocha \
    'test/**/*_test.js' \
    --harmony-proxies \
    --watch \
    --reporter dot \
    --require test/test_helper.js
