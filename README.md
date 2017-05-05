# Docker Upload

Upload saved Docker image to web interface to automatically import into registry.

Allows you to transfer images between systems from one registry to another without having to manually transfer the image to a machine running Docker, running `docker load ...`, tagging with the registry, and pushing.

## Getting Started

1. Pull the image

  ```
  docker pull alexbrazier/docker-upload
  ```
2. Run the image

  ```
  docker run --privileged -p 8080:80 -e REGISTRY=192.168.0.1:5000 -e INSECURE_REGISTRY=true -d alexbrazier/docker-upload
  ```
3. Open site at http://localhost:8080

Note: As the Docker container runs its own Docker to avoid interfering with the base Docker you must run the container with `--privileged`.

## Env Variables

`REGISTRY` - The registry to push images to (required)
`INSECURE_REGISTRY` - If the registry should use http instead of https
`DOCKER_OPTS` - Extra options to run with the docker daemon command
`PORT` - Specify a custom port for the docker container (default 80)
