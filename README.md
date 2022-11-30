<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in development environment

1.Clone repository
2.Execute

```
npm install
```

3. Install Nest CLI

```
npm i -g @nestjs/cli
```

4. Turn on mongodb database

```
docker-compose up -d
```

5. Clone file `.env.template and` rename to `.env`
6. Fulfill environment variables defined on `.env`
7. Execute application with

```
npm run start:dev
```

8. Fulfill database executing get to

```
http://localhost:3000/api/seed
```

## Used stack

- Mongodb
- Nestjs
- Typescript

# Production build

1. Create file `.env.prod`
2. Fill the required environment variables
3. Build the image

```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```
