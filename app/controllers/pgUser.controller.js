const {pool:db}  =require('../config/pgdb.config')

const getUsers = async (request, response) => {
    // db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(200).json(results.rows)
    // })


    const data= await db.query('SELECT * FROM users ORDER BY id ASC');
    try {
        response.status(200).json(data.rows)
    } catch (error) {
        response.status(500).json(error.message || "Unable to fetch Data");
    }
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    const {
        name,
        email
    } = request.body
    db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added successfully`)
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name,
        email
    } = request.body
    db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
