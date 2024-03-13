# Mercure Platform.sh Template

Mercure is an open protocol for real-time communications designed to be fast, reliable and battery-efficient. It is a modern and convenient replacement for both the Websocket API and the higher-level libraries and services relying on it.

Mercure is especially useful to add streaming capabilities to REST and GraphQL APIs. Because it is a thin layer on top of HTTP and SSE, Mercure is natively supported by modern web browsers, mobile applications and IoT devices.

See https://mercure.rocks.

Make sure you change in `.mercure/.environment`

```
MERCURE_PUBLISHER_JWT_KEY='!ChangeMe!'
MERCURE_SUBSCRIBER_JWT_KEY='!ChangeMe!'
```

You probably also want to disable the demo/ui in:
`mercure/Caddyfile.upsun` and possibly allowing anonymous users.

## Copyright

For Mercure: [Kévin Dunglas](https://dunglas.fr), all rights reserved.

# How this example was built:

## Installation
```bash
$MERCURE_VERSION="0.14.0"
wget https://github.com/dunglas/mercure/releases/download/v{$MERCURE_VERSION}/mercure_{$MERCURE_VERSION}_Linux_x86_64.tar.gz
gunzip mercure_{$MERCURE_VERSION}_Linux_x86_64.tar.gz
tar xvf mercure_{$MERCURE_VERSION}_Linux_x86_64.tar
```

## Add mount for DB (you can also use postgres etc..)
`.upsun/config.yaml`

```yaml
applications:
  mercure:
    mounts:
      'db':
        source: storage
        source_path: db
```
## Make sure caching are request buffering are off

`.upsun/config.yaml`
```yaml
routes:
  "https://mercure.{default}/":
    type: upstream
    upstream: "mercure:http"
    cache:
        enabled: false
```

And in `.upsun/config.yaml`, in the `mercure` app definition

```yaml
applications:
  mercure:
    web:
      locations:
        /:
          allow: false
          passthru: true
          request_buffering:
            enabled: false
          headers:
            Access-Control-Allow-Origin: "*"
```

## Configuration (in the `.upsun/config` file)

```bash
applications:
  mercure:
    variables:
      env:
        SERVER_NAME=:8888
        MERCURE_PUBLISHER_JWT_KEY='!ChangeMe!'
        MERCURE_SUBSCRIBER_JWT_KEY='!ChangeMe!'
```

## Start command

```
./mercure run -config Caddyfile.upsun
```