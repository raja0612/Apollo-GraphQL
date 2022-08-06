const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql `
    type Query {
        helloWorld: String!
        hi: String
    }
`;

const resolvers = {
    Query: {
        helloWorld: (parent, args, context, info) => {
                    console.log("parent", parent);
                    console.log("args", args);
                    console.log("context", context);
                    console.log("info", info);
            return "Hello World from Apollo GraphQL";
        },
        hi: async () => {
            return "Resolver can be async";
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        "firstName": "Raj",
        "lastName": "Ram"
    }
});


server.listen().then(({ url }) => console.log(`server started at ${url}`));

