function actionsLogger(req, res, next) {
    console.log('hello, world!')
    next()
}

module.exports = {
    actionsLogger
}