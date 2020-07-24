const Pool = require('pg').Pool
/*const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'ui0ooBhAHmyY2jHYClhn',
    port: 5432,
})*/



const pool = new Pool({
    user: 'postgres',
    host: '',
    database: '',
    password: '',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "user"', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results);
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}



const createUser = (request, response) => {
    const { username } = request.body

    pool.query('INSERT INTO user (username) VALUES ($1)', [username], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${username}`)
    })
}


module.exports = {
    getUsers,
    getUserById,
    createUser
}