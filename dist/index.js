"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var winston_1 = __importDefault(require("winston"));
var express_winston_1 = __importDefault(require("express-winston"));
var schema_1 = require("@graphql-tools/schema");
var express_graphql_1 = require("express-graphql");
var schemas_1 = require("./graphql/schemas");
var resolvers_1 = require("./graphql/resolvers");
var requests_handler_1 = require("./utils/requests-handler");
var app = (0, express_1.default)();
// Security middleware
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        "script-src": ["'self'", "https://jam.dev", "blob:", "i.imgur.com", "data:", "'unsafe-inline'"]
    }
}));
app.use((0, cors_1.default)({
    origin: '*', // Configure this according to your specific requirements
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
// Logging middleware
app.use(express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: process.env.LOG_FILE || "logs/server.log" })
    ],
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.simple() // Use a simple format
    ),
    expressFormat: true,
    colorize: false,
    meta: true,
    msg: "{{res.statusCode}} {{req.method}} {{req.url}}" // Customize the msg property
}));
// GraphQL schema setup
var schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: schemas_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
// GraphQL endpoint with express-graphql
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: process.env.NODE_ENV !== 'production', // Enable GraphiQL in development mode
    customFormatErrorFn: function (err) {
        console.error(err); // Log the error
        return {
            message: err.message,
            locations: err.locations,
            path: err.path
        };
    }
}));
// Centralized error handling
app.use(requests_handler_1.errorHandler);
// Server start
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
//# sourceMappingURL=index.js.map