import express from "express";
import helmet from "helmet";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";

import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import { errorHandler } from "./utils/requests-handler";

const app = express();

// Security middleware
app.use(helmet.contentSecurityPolicy({
  directives: {
    "script-src": ["'self'", "https://jam.dev", "blob:", "i.imgur.com", "data:", "'unsafe-inline'"]
  }
}));

app.use(cors({
  origin: '*', // Configure this according to your specific requirements
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Logging middleware
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: process.env.LOG_FILE || "logs/server.log" })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple() // Use a simple format
  ),
  expressFormat: true,
  colorize: false,
  meta: true,
  msg: "{{res.statusCode}} {{req.method}} {{req.url}}" // Customize the msg property
}));


// GraphQL schema setup
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// GraphQL endpoint with express-graphql
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production', // Enable GraphiQL in development mode
  customFormatErrorFn: (err) => {
    console.error(err); // Log the error
    return {
      message: err.message,
      locations: err.locations,
      path: err.path
    };
  }
}));

// Centralized error handling
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
