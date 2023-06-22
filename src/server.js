require('dotenv').config()
const Hapi = require('@hapi/hapi')
// notes plugin
const notes = require('./api/notes')
const NotesService = require('./services/postgres/NotesService')
const NotesValidator = require('./validator/notes')
// users plugin
const users = require('./api/users')
const UserService = require('./services/postgres/UsersService')
const UsersValidator = require('./validator/users')

const init = async () => {
  const notesService = new NotesService()
  const usersService = new UserService()
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator
      }
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator
      }
    }
  ])

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
