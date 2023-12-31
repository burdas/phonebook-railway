const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();

app.use(express.static('dist'))
app.use(cors())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
      ].join(' ');
}));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (_, response) => {
  response.json(persons);
});

app.get("/info", (_, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.use(express.json());

app.post("/api/persons", (request, response) => {
  let person = request.body;

  const errorMessage = !person.name
    ? "name missing"
    : !person.number
    ? "number missing"
    : persons.find((p) => p.name === person.name)
    ? "name must be unique"
    : null;
  if (errorMessage) {
    return response.status(400).json({
      error: errorMessage,
    });
  }

  // Random number between 0 and Number.MAX_SAFE_INTEGER
  person = {
    ...person,
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
