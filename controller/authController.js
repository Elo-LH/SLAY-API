const signup = (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Signup route',
  })
}
module.exports = { signup }
