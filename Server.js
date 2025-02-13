// imports
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 9000;
const app = express();
const fs = require('fs');
const resolvers = require('./src/resolvers');
const typeDefs = fs.readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(port, () => console.info(`Server started on port ${port}`));
