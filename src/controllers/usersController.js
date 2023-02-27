module.exports = {
    register : (req,res) => {
        return res.render('users/register',{
            title: 'Register'
        })
    },
    processRegister : (req,res) => {
        return res.send(req.body)
    },
    login : (req,res) => {
        return res.render('users/login',{
            title: 'Login'
        })
    },
    processLogin : (req,res) => {
        return res.send(req.body)
    },
}