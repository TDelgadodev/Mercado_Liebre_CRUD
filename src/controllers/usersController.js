const { validationResult } = require('express-validator');
const {hashSync} = require('bcryptjs');
const { readJSON,writeJSON } = require('../data');


module.exports = {
    register : (req,res) => {

        const errors = validationResult(req);

        return res.render('users/register',{
            title: 'Register',
            errors : errors.mapped(),
            old : req.body
        })
    },
    processRegister : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
          const users = readJSON('users.json')
          const {name,surname,email,password} = req.body
    
          const newUser = {
            id: users.length ? users[users.length -1].id + 1 : 1,
            name: name.trim(),
            surname: surname.trim(),
            email: email.trim(),
            password: hashSync(password,12),
            rol : 'user'
          }
            users.push(newUser)
            writeJSON('users.json',users);
            return res.redirect('/users/login')
        }else{
            return res.render('users/register',{
                title: 'Register',
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    login : (req,res) => {
        return res.render('users/login',{
            title: 'Login'
        })
    },
    processLogin : (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){

            const {id,name,rol} = readJSON('users.json').find(user => user.email === req.body.email)

            req.session.userLogin = {
                id,
                name,
                rol
            };
        if (req.body.remember) {
            res.cookie('userML', req.session.userLogin, {max: 1000 * 60})
        }
            return res.redirect('/')
        }else{
            return res.render('users/login',{
                errors : errors.mapped(),
                title: 'Login'
            })
        }
    },
    profile: (req,res) =>{
        return res.render('users/profile')
    },
    destroy: (req,res) =>{
        req.session.destroy();
        return res.redirect('/')
    }
}