![Stellection Header Image](/images/GitHub%20README%20Header%20Image.png)

# Stellection
Stellection is a tag-based file organization system geared toward digital asset curation.

## Tech Stack
### Frontend
- Language: JavaScript (with a little bit of TypeScript)
- Web Framework: [React](https://reactjs.org/) (through [create-react-app](https://create-react-app.dev/))
- Component Library: [Geist-UI](https://geist-ui.dev/)
- API Requests: [SWR](https://swr.vercel.app/) 
### Backend
- Language: Node.js (with a little bit of TypeScript)
- Web Server: [Express](https://expressjs.com/)
- Database ORM: [Sequelize](https://sequelize.org/)
### Tooling
- Monorepo & Building: [Turbo](https://turbo.build/)
- Deployment: [Docker & Docker Compose](https://docker.com/)
### Other
Stellection also includes other microservices that accomplish tasks for the backend, such as a machine learning-based tagging engine. These are still a work-in-progress.

# Setup

## First Time Setup
1. Install Docker Desktop
2. Open Docker Desktop, make sure the Docker engine has started

```
git clone https://github.com/ckhawks/Stellection
cd Stellection
npm run up:build
```

Run stack with build (in case of changed Dockerfile, docker-compose, or npm packages). _You will have to build again if you install any new `npm` packages into any part of the repository._
```
DEV: npm run up:build
PROD: npm run up_prod:build
```

Run stack without build
```
DEV: npm run up
PROD: npm run up_prod
```

Run frontend or backend solo for development
```
npm run frontend
npm run backend
```

Clean hanging docker containers if you get a docker disk full error
```
npm run clean:docker
```

## Unraid
I am deploying this to my personal Unraid server. For my own notes, the deployment process is as follows:
```
ssh unraid
cd /mnt/user/appdata/stellection
git pull
```
In Unraid dashboard
1. Find stellection-prod compose stack
2. Update Stack
3. Compose up