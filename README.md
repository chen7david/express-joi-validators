# Express Joi Validators (EJV)


### Introduction
Joi validation wrapper middleware for validating express request headers and body.

####  Getting Started
Here we will show you how to get started with express-joi-validators, through an example. Please follow the steps below to guide you through the process:
- create a new folder on your desktop
- navigate into the folder with your CLI. <code>$ cd your_directory_path</code>
- create a file called <code>index.js</code>
- copy and paste the example code into your <code>index.js</code> file
- run <code>npm init -y</code>
- run <code>npm i express @hapi/joi express-joi-validators</code>
- run node <code>index.js</code>
- open <code>http://localhost:5000</code> in your browser
- you should now get a response similar to the one given in the example below. 

```js 
// PART 1: Setting up express
const express = require('express') 
const app = express()
const server = require('http').createServer(app)
const port = 5000

// PART 2: Require in Joi and express-joi-validators
const Joi = require('@hapi/joi')
const { validateHeader, validateBody } = require('express-joi-validators')

// PART 3: Setting up request JSON and URL parsers. Note: if they are not called, joi will not call next(error)
app.use(express.json()) // This middleware is required for schemas validation to work.
app.use(express.urlencoded({ extended: true }))

// PART 4: Create Joi schema for validating request body
const schema = Joi.object().options({abortEarly: false}).keys({
    username: Joi.string().lowercase().required(),
    password: Joi.string().min(6).required(),
})

// PART 5: Create route with validatorBody mounted
const requestHandler = (req, res) => res.end()
app.use('/', validateBody(schema), requestHandler)


// PART 6: Mount an express errorHandler middleware to catch and handle the Joi validation Error
const errorHandler = (err, req, res, next) => res.status(422).json(err)
app.use(errorHandler) 

// PART 7: Set server to listen for requests
server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
```