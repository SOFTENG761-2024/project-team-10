# Give it a good name app

# Code Structure

```bash
> .github - Github Actions CICD Pipeline
    | cd.yml - continuous deployment workflow
    | ci.yml - continuous integration workflow
> backend - Node & Express & MongoDB code
    | .env local node config/creds
    | package.json - backend dependencies
> e2eTests - playwright e2e tests(chrome only)
    | .env - local playwright configs
> frontend - Vite React
    | .env local frontend config/creds
    | package.json - frontend dependencies
> infrastructure AWS CDK TypeScript
    | package.json - AWS CDK dependencies
> scripts - useful scripts for local dev, CI and CD
> wiremock - A framework to mock api responses.
.env - MONGODB local config/creds
docker-compose-ci.yml - docker-compose for CI environment
docker-compose-prod.yml - docker-compose for PROD environment
docker-compose.yml - docker-compose for LOCAL DEV environment
Dockerfile - Frontend & Backend App docker container
```

# Important: How to set up local development environment

## Install nvm

### Windows

Download the Zip (nvm-noinstall.zip)
[HERE](https://github.com/coreybutler/nvm-windows/releases)

### Mac

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

## Provision nodejs

```bash
nvm install 20.11.1
nvm use 20.11.1
```

## Install nodemon globally

```bash
npm install -g nodemon
```

## setup frontend react project

```bash
cd ./frontend
npm install
```

## setup backend node project

```bash
cd ../backend
npm install
```

## Install Docker Desktop

### Windows

Follow the instruction [HERE](https://docs.docker.com/desktop/install/windows-install/#:~:text=Download%20the%20installer%20using%20the,Program%20Files%5CDocker%5CDocker%20)

### Mac

```bash
brew install docker
```

---

# 4. How to run frontend react, backend node, mongodb in dev mode or as docker containers

## 1. Run mongodb & wiremock(docker-compose)

Run this from Git Bash if you use Windows

```bash
# In a new shell, and keep this shell opened
cd ./backend
npm run start:dep
```

#Verify the env,
Open http://localhost:8080/db/admin/ in your browser, and login with dev/dev

## 2. Run frontend react

```bash
cd ./frontend
npm run dev
```

## 3. Run backend node

```bash
cd ./backend
npm start
# (starts node server at `localhost:3000`)
```

## MongoDB

## Login to MongoDB

1. default username: devroot
1. default password: devroot
1. default database: test

## Login to MongoDB Admin Portal

http://localhost:8080/db/admin/

Username: `dev`, Password:`dev`

# How to test the code

## Frontend unit tests

1. `cd ./frontend`
2. `npm test`

## Backend unit tests

1. `cd ./backend`
2. `npm test`

You can also manually test APIs with swagger UI

1. go to http://localhost:3000/api/api-docs
2. view and call apis for testing

## Testing AWS CDK infrastructure as code

You need to reachout to Mark(mzhu929) for giving you permission to access AWS console and deploying stacks as this is his personal AWS account.

```bash
cd ./infrastructure
npm run deploy-dev
```

## Wiremock

Wiremock is a framework used to mock api responses. This is helpful when working with external APIs that have call limits or are slow to respond.

Put your mock files under `deployment/wiremock/__files` and `deployment/wiremock/mappings`

Refere to the `json` example here: https://wiremock.org/docs/stubbing/

## Browser end-to-end tests

### Note that we support only `Chrome` at this time

### Prerequisite

install playwright and chromium

```bash
npx playwright install --with-deps chromium
```

Ensure you have spinned up react, node servers & mongodb docker containers locally. If you have not, follow the `Important: How to set up local development environment` guide above.

under project root folder:

1. `cd e2eTests`
2. `npm run test:e2e`

If you raise a pr, Github Actions will trigger the `./github/workflow/ci.yml` workflow which runs all automated tests

# Q & A

### 1. sh command not found running npm commands

##### A: Please make sure you use Git Bash to run the command if you are on Windows

### 2. docker or docker-compose command not found

##### A: Please review `Important: How to set up local development environment` section and install docker desktop.

##### A: Please make sure you use Git Bash to run the command if you are on Windows

### 3. For AWS CDK code getting error when running `npm run deploy-dev`

##### A: See `testing AWS CDK infrastructure as code` section for details

### 4. How do I access latest deployed website

##### A: We provision new EC2 instances if we have infrastructure change. Need to go to github actions to grab the latest working frontend url. Get it from the latest successful `CD` build from Github Actions
