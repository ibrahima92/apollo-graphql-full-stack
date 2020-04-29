const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`
    type User {
        id: ID
        login: String
        avatar_url: String
    }

    type Query {
        users: [User]
    }
`

const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await axios.get('https://api.github.com/users')
                console.log("users.data", users.data)
                return users.data.map(({ id, login, avatar_url }) => ({
                    id,
                    login,
                    avatar_url 
                }))
            } catch (error) {
                throw error
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
