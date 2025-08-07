if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methoOverried = require('method-override')
const { Pool } = require('pg')
const path = require('path')

const pool = new Pool({
    user: 'kumananm',
    host: 'localhost',
    database: 'login',
    password: 'BeatBobbyFisher123',
    port: 5432,
})

const initializePassport = require('./passport-config')
initializePassport(
    passport, pool,
    /* async email => {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
        return result.rows[0]
    },
    async id => {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        return result.rows[0]
    } */
)

app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: false }))// tells app that we can take form results in req variables in post method
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methoOverried('_method'))
app.use(express.static(path.join('')))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //what the name field is in ejs file corresponds to what goes after body
        
        await pool.query (
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
            [req.body.name, req.body.email, hashedPassword]
        )

        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } 

    res.redirect('/login')
}

app.delete('/logout', async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.get('/search', (req, res) => {
    res.render('search.ejs')
})

app.get('/calculator', (req, res) => {
    res.render('calculator.ejs')
})

app.get('/review', (req, res) => {
    res.render('review.ejs')
})

app.listen(2000)