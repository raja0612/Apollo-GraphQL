const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql `

    type Query {
        helloWorld: String!
        user: User!
        apiResponse: APIResponse!
    }
    type User {
        id: ID!
        username: String!
    }

    type APIResponse {
        status: Status!
        code: ID!
    }

    enum Status {
        OK
        BAD_REQUEST
    }

    input UserInput {
       username: String!
       password: String!
    }
    type Mutation {
        login(userInput: UserInput!): User
    }

`;

const resolvers = {

    //resolver for User type
    User: {
        id: () => 1,
        username: () => `user name is coming from field level resolver, 
        this will override all below resolver return types which are User
        for example login mutation resolver`,
    },
    
    Query: {

        helloWorld: () => "Hello World from Apollo GraphQL",

        user: () => ({
            id: 1,
            username: " I am user from user Query resolver"
        }),

        apiResponse: () => {
            return {
                status: 'OK', // if value is not OK, BAD_REQUEST 
                             //then give error when calling apiResponse from play ground
                code: 200
            }
        }
    },


    

    /*
      VERY IMPORTANT **********

      here login mutation resolver returns
      {
        user: Math.random(),
        username: args.username
       }

       but it returns 
        {
          id: () => 1,
           username: () => "resolver can be resolved by field level",
        },

        because resolver resolved by top level

    */
    Mutation: {
        login: (parent, args, context, info) => {
            return {
                user: Math.random(),
                username: args.username
            }

        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen().then(({ url }) => console.log(`server started at ${url}`));

