#!/bin/sh

# Start the docker daemon in the background
if $INSECURE_REGISTRY; then
  docker daemon --insecure-registry $REGISTRY $DOCKER_OPTS &
else
  docker daemon $DOCKER_OPTS &
fi

# Launch app
node index
