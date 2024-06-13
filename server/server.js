const express = require('express');
const { ApolloServer} = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const jwt = require('jsonwebtoken')
//will change post prodution
const SECRET_KEY = 'mysecretssshhhhhhh';


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const context = authMiddleware({ req });
    if (!context.user && !['/login', '/signup'].includes(req.path)) {
      throw new AuthenticationError('You must be logged in');
    }
    return context;
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).json({ message: 'Incorrect credentials' });
  }

  const correctPw = await user.isCorrectPassword(password);

  if (!correctPw) {
    return res.status(403).json({ message: 'Incorrect credentials' });
  }

  const token = jwt.sign({ email: user.email, _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, user });
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({ username, email, password });
  const token = jwt.sign({ email: user.email, _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, user });
});

// Call the async function to start the server
  startApolloServer();
