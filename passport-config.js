const { authenticate } = require('passport')
const bcrypt = require('bcrypt')

const LocalStrategy = require('passport-local').Strategy

function initialize(passport, pool) {
    const authenticateUser = async (email, password, done) => {
        try {
            const { rows } = await pool.query(
                `SELECT id, name, email, password FROM users WHERE email = $1 LIMIT 1`,
                [email]
            )
            const user = rows[0]

            if (!user) {
                return done(null, false, { message: "No user with that email" })
            }

            const passwordMatches = await bcrypt.compare(password, user.password)
            if (!passwordMatches) {
                return done(null, false, { message: "Password incorrect" })
            }

            const { password: _discard, ...safeUser } = user
            return done(null, safeUser)
        } catch (err) {
            return done(err)
        }
    }

    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' }, 
            authenticateUser
        )
    )

    passport.serializeUser((user, done) => done(null,user.id))
    
    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query(
                `SELECT * FROM users WHERE id = $1`, 
                [id]
            )
            const user = rows[0]
            if (!user) return done(new Error('User not found'))
            return done(null, user)
        } catch (err) {
        return done(err)
        }
    })
}

module.exports = initialize