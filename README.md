# Technical Assessment

Implementation of the technical assessment using MQTT and MongoDB (initially).

## Description

The assessment consists of three separate services that communicate over MQTT (using the mosquitto
MQTT broker).

- generator: generates random 'phone numbers'
- metadata: enriches (valid) raw number messages with metadata (country of origin and whether its a
  mobile number)
- store: stores the enriched messages in a MongoDB database

## Structure

The project is set up as a monorepo using [npm
workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) to handle local package
dependencies.

This also means the `Dockerfile` for each individual services is relative to the project root
directory.

## Usage

The project can be run using `docker-compose` from the project root dir.
```bash
docker-compose up -d
```
