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
### Other
Stellection also includes other microservices that accomplish tasks for the backend, such as a machine learning-based tagging engine. These are still a work-in-progress.

# Setup

## First Time Setup
1. Install Docker Desktop
2. Open Docker Desktop, make sure the Docker engine has started

```
git clone https://github.com/ckhawks/Stellection
cd Stellection
docker compose up --build
```


## Future
```
docker compose up
```
You will have to build again if you install any new `npm` packages into any part of the repository.
```
docker compose up --build
```