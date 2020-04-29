import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './App.css'

const GET_USERS = gql`
    {
        users {
            id
            login
            avatar_url
        }
    }
`

const User = ({ user: { login, avatar_url } }) => (
    <div className='Card'>
        <div>
        <img alt="avatar" className='Card--avatar' src={avatar_url} />
        <h1 className='Card--name'>{login}</h1>
        </div>
        <a href={`https://github.com/${login}`} className='Card--link'>
            See profile
        </a>
    </div>
)

function App() {
    const { loading, error, data } = useQuery(GET_USERS)

    if (error) return <h1>Something went wrong!</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <main className='App'>
            <h1>Github | Users</h1>
            {data.users.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </main>
    )
}

export default App
