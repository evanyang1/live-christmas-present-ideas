require('dotenv').config()

const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')
const moment = require('moment')

const bodyParser = require('body-parser')
const { join } = require('path')

const axios = require('axios')



const app = express(feathers()) // integrate feathers with express

// Middleware
app.use(express.json())
app.configure(socketio())

app.use(bodyParser.json())
app.use(express.static(join(__dirname, 'public')))
app.use(require('./routes'))
// enable REST services
app.configure(express.rest())

// Idea Service
class IdeaService {
    constructor() {
        this.ideas = []
    }

    async find() {
        return this.ideas
    }

    async create(data) {
        const idea = {
            id: this.ideas.length,
            text: data.text,
            viewer: data.viewer
        }
        
        idea.time = moment().format('MMMM Do YYYY, h:mm:ss a')
        this.ideas.push(idea)
        return idea 
    }
} 


// register services
app.use('/ideas', new IdeaService())

app.on('connection', conn => app.channel('stream').join(conn))

app.publish(data => app.channel('stream'))

const PORT = process.env.PORT || 3030
require('./config')
    .then(() => {
        app.listen(PORT).on('listening', () => console.log(`Realtime server running on port ${PORT}`))
    })
    .catch(e => console.error(e))

//app.listen(PORT).on('listening', () => console.log(`Realtime server running on port ${PORT}`))
/*
app.service('ideas').create({
    text: 'Build a cool app',
    tech: 'Node.js',
    viewer: 'John Doe'
})
*/