#!/bin/bash

# "relative_humidity_2m,temperature_2m,wind_speed_10m,wind_direction_10m,direct_radiation"
API_PARAMS="$1"

curl --silent "https://api.open-meteo.com/v1/forecast?latitude=40.18&longitude=44.52&current=$API_PARAMS"
