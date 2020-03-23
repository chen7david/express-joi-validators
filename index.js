const validateBody = (schema) => (req, res, next) => {
    try {
        const body = req.body
        const { error, value } = schema.validate(body)
        if(error) return next(error)
        if(!req.ctx) req.ctx = {}
        req.ctx.body = value
        next()
    } catch (err) {
        next(err) 
    }
}

const validateHeader = (schema) => (req, res, next) => {
    try {
        const headers = req.headers
        const { error, value } = schema.validate(headers)
        if(error) return next(error)
        if(!req.ctx) req.ctx = {}
        req.ctx.headers = value
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { validateHeader, validateBody }