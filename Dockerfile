FROM caddy:2.0.0

COPY ./Caddyfile /etc/caddy/Caddyfile
COPY ./dist /app
EXPOSE 9999
