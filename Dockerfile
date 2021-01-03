FROM node:12-stretch-slim

RUN runDeps="openssl ca-certificates" && \
    apt-get update && \
    apt-get install -y --no-install-recommends $runDeps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/frontend/

COPY package.json yarn.lock ./
RUN chown -R node /opt/frontend/

USER node

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn --frozen-lockfile

COPY . .

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build && \
    rm -rf /home/node/.cache

EXPOSE 3000 3001 4000 4001

ENTRYPOINT [ "/opt/frontend/entrypoint.sh" ]
CMD [ "yarn", "start:prod" ]
