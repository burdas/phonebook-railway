
# Phonebook
## Backend

This application implements phonebook backend.

* The application GET all persons
* The application GET information of one persons
* The application DELETE one person
* The application POST information from one person

The project was build with:

![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

And to deploy backend to internet i use a separeted github repository.

**Instead of heroku i use a railway, because heroku not have a free plan.**

The github repository is a copy of the main repository of the course repository.

* [Github deployment repository](https://github.com/burdas/phonebook-railway)
* [railway.app](https://railway.app)


### Deployment

To install all dependencies

```bash
  $ npm install
```

To run the server in development mode

```bash
  $ npm run dev
```

To run the server in production mode

```bash
  $ npm run start
```

To deploy (upload changes to github)
```bash
  $ git commit -m
  $ git push origin main
```
