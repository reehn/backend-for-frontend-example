# An example of a backend for a frontend

## Thoughts
### REST-API
We use an express-server that was created through the `express-generator`.
I removed and changed some of the generated file to better fit this application.

The routes are structured so we can easily add more routes in a controlled and structured manner.

### Database
This example is using a silly "fake database" consisting of a json-file. In a real matter I would like to use a MongoDB instance and store the credit cards as documents with a similar structure as `fakeCreditCards.json`. I started the code to use MongoDB, but didn't feel I had the time to implement it as I haven't really used MongoDB before.