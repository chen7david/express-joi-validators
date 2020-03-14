const validateBody = (schema) => {
    return (req, res, next) => {
        const body = req.body
        const { error, value } = schema.validate(body)
        if(error) return next(error)
        if(!req.ctx) req.ctx = {}
        req.ctx.body = value
        next()
    }
}

const validateHeader = (schema) => {
    return (req, res, next) => {
        const headers = req.headers
        const { error, value } = schema.validate(headers)
        if(error) return next(error)
        if(!req.ctx) req.ctx = {}
        req.ctx.headers = value
        next()
    }
}

module.exports = { validateHeader, validateBody }