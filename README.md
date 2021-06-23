# Notes API

Public REST API developed with NodeJS, Express and MongoDB. Dockerized with docker-compose and deployed in AWS EC2.

## JWT Authentication

First, we should create at least one user in order to obtain a token. Otherwise, we won't be able to perform requests (Header auth-token needed)

`POST`: /api/auth/register

```json
{
  "name": "Username",
  "email": "username@mail.com",
  "password": "XXXXXX"
}
```

Once we have the user created, we perform the login and get the token to include in the rest of the requests

`POST`: /api/auth/login

```json
{
  "email": "username@mail.com",
  "password": "XXXXXX"
}
```

## Main functionalities:

- `GET` Get all notes
  `/api/notes/`
- `GET` Get notes paginated
  `/api/notes/?limit=[int]&page=[int]`
- `GET` Get specific note
  `/api/notes/:id`
- `POST` Create note
  `/api/notes`
- `PATCH` Update note
  `/api/notes/:id`
- `DELETE` Delete note
  `/api/notes/:id`

## How to Deploy in AWS and run containers with docker-compose

Prerequisites

- EC2 Instance up and running (AWS Linux 2 is the one tested for this example) and an Elastic IP associated highly recommended to connect. Otherwise, we can just connect with the domain of our instance (your-ec2-domain-and-region.compute.amazonaws.com)

First, run this command (ec2-user and 0.0.0.0 should be replaced by your ssh user and EC2 Instance Elastic IP) from the director where we saved the .pem and point to the folder where the project is saved.

```bash
scp -r -i notes-app.pem ./notes-api ec2-user@0.0.0.0:~/
```

Connect through ssh to our instance:

```bash
ssh -i yourkeyname.pem ec2-user@0.0.0.0
```

Install docker (yum):

```bash
sudo yum update
sudo yum install docker
```

Install docker compose (source: https://docs.docker.com/compose/install/):

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

Finally, we move to our directory and run this command to run the two containers configurated in docker-compose.yml

- api_service
- mongo

```bash
sudo docker-compose up
```
