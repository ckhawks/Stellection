# Stellection Cataloger
Backend cataloger system that exposes a RESTful API that manages catalog storage. list-based content aggregation

## Goals

- RESTful API (backend) is not dependent on frontend for usage
- Files are stored in a structure that leaves them still accessible and detachable from the software
  - Primary tag possibly required?
- **Prioritize a working system that accomplishes the minimum requirements before making it fancy and feature-full**
- Able to be deployed without requiring a front-end
  - For example, I could plug my photography website into an instance of the Cataloger and access a specific library set up for my portfolio photo albums.

## Technical Considerations

- Cluster storage must occur outside of file metadata because trying to support a variety of filetypes, there will not be a consistent elegant solution.
- Clusters and Galaxies should respect order of items (be orderable)

## Data Models Plan

**Star** - an **item** that is stored (image, document, video, audio)  
- Create
- Read (access)
- Update
- Delete

**Cluster** - a **collection** of items that are grouped together. Stars can fit into multiple clusters. Acts like tags. Alternative name constellation
- Create
- Read (access)
- Update
- Delete

**Galaxy** - a **library** of items and collections
- Create
- Read (access)
- Update
- Delete

## API Modelling
View in [Swagger](#)

## MVPs

1. Stars in clusters
2. RESTful API to perform above
3. Galaxies/Libraries 
4. 

## Future

Cluster Categories, ex:
- Medium
- Content
- Color

User Accounts
- API Access Token
- Per-user Galaxies

## File Formats

### libraries.json
Refers to individual Galaxies that the software should read the database of.
```json
{
    "libraries": [
        {
            "path": "path/to/library1",
            "name": "Library 1 (Images)",
            "version": "1.0.0"
        },
        {
            "path": "path/to/library2",
            "name": "Library 2 (Music)",
            "version": "1.0.0"
        },

    ]
}
```

## Technologies & External References

- redoc-cli - API Documentation Generation https://redocly.com/docs/redoc/deployment/cli/
- Flask - Python API Framework
- 

# Stellection Frontend

- Simple ingest screen that allows you to input certain links in various formats and automatically download them
- Organization screen that allows you to user a tagging wizard