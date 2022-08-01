const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");



// const expressPinoLogger = require('express-pino-logger');
const logger = require('./services/loggerservice');

const {EmailAddressResolver } = require('graphql-scalars');



// const loggerMiddleware = expressPinoLogger({
//     logger: logger,
//     autoLogging: false
// });


const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { Query } = require("./resolvers/Query");
const {Mutation} = require("./resolvers/Mutation");
const {typeDefs} = require("./schema");
const { db} = require("./db"); 


async function startApolloServer() {
    const app = express();

    // app.use(loggerMiddleware);
  
    const httpServer = http.createServer(app);
  
    const server = new ApolloServer({
      typeDefs:[
        typeDefs,
        
      ]
      ,
      resolvers: {
       EmailAddress: EmailAddressResolver,
        Query,
        Mutation,
        Category,
        Product
       
    },
      context: {
        db
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  
    await server.start();
  
    server.applyMiddleware({ app });
  
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

  startApolloServer();


// const server = new ApolloServer({
//     typeDefs,
//     resolvers: {
//         Query,
//         Mutation,
//         Category,
//         Product
//     },
//     context: {
//         db,
//     },
//     });


// server.listen().then(({url}) => {
//     console.log(`Server is listening at ${url}`);
// });