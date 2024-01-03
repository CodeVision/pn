# Technical Assessment

Implementation of the technical assessment using MQTT and MongoDB (initially).

## Description

The assessment consists of three separate services that communicate over MQTT (using the mosquitto
MQTT broker).

- generator: generates random 'phone numbers'
- metadata: enriches (valid) raw number messages with metadata (country of origin and whether its a
  mobile number)
- store: stores the enriched messages in a MongoDB database
