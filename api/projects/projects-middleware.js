function projectsLogger(req, res, next) {
    console.log('hello, world!')
    next()
}
async function postValidator(req, res, next) {
    const { name, description } = req.body
    try {
        if (!name || !description) {
            res.status(400).json({ message: 'Missing required fields' })
        } else {
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Failed to validate project' })
    }
}
async function putValidator(req, res, next) {
    const { name, description, completed } = req.body
    try {
        if (!name || !description || !completed) {
            res.status(400).json({ message: 'Missing required fields' })
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Failed to validate project' })
    }
}

module.exports = {
    projectsLogger,
    postValidator,
    putValidator,
}