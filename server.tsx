const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema.tsx');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}));

app.listen(5000, () => {
    console.log('Server is running on port 5000..');
});
