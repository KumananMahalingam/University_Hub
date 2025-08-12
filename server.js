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
app.use(express.static('view_styles'));
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

app.get('/search', async (req, res) => {
    try {
        const result5 = await pool.query(`
            SELECT * FROM university_information
            `)
        res.render('search.ejs', { data5: result5.rows })
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
})

app.get('/calculator', async (req, res) => {
    res.render('calculator.ejs');
})

app.get('/averages/:universityId/:majorId', async (req, res) => {
  const { universityId, majorId } = req.params;
  try {
    const result = await pool.query(
      `SELECT avg1, avg2, avg3, avg4, avg5, avg6, avg7, avg8, avg9, avg10, avg11, notes
       FROM program_admission_averages
       WHERE university_id = $1 AND major_id = $2`,
      [universityId, majorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/review', (req, res) => {
    res.render('review.ejs')
})

app.post('/review', async (req, res) => {
    try {
        const { university_id, rating } = req.body;
        const user_id = req.user.id; 
        const body = req.body.body;
        const title = req.body.name;

        await pool.query(
            `INSERT INTO reviews (user_id, university_id, rating, title, body, created_at) VALUES ($1, $2, $3, $4, $5, NOW())`,
            [user_id, university_id, rating, title, body]
        );

        res.redirect('/review'); 
        console.log(req.body)
    } catch (err) {
        console.error('Error saving review', err);
        res.status(500).send('Error saving review');
    }
});

app.get('/uoft', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                majors.name AS major_name,
                university_majors.admission_average,
                university_majors.tuition_cost,
                university_majors.books_supplies
            FROM university_majors 
            JOIN university_information ON university_majors.university_id = university_information.id
            JOIN majors ON university_majors.major_id = majors.id
            WHERE university_majors.university_id = $1
        `, [4]);

        const result6 = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                residence.name AS residence_name,
                residence.room_type AS room_type,
                residence.capacity AS capacity, 
                residence.price_range AS price_range,
                residence.rating AS rating
            FROM residence
            JOIN university_information ON residence.university_id = university_information.id
            WHERE residence.university_id = $1
            `, [4])

        const result10 = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                university_rating.overall AS overall,
                university_rating.academics AS academics,
                university_rating.safety AS safety,
                university_rating.partying AS partying,
                university_rating.cafeteria AS cafeteria,
                university_rating.happiness AS happiness,
                university_rating.residences AS residences,
                university_rating.location AS location,
                university_rating.diversity AS diversity, 
                university_rating.affordability AS affordability,
                university_rating.employability AS employability
            FROM university_rating
            JOIN university_information ON university_rating.university_id = university_information.id
            WHERE university_rating.university_id = $1
            `, [4])

        const result14 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_admission.application_deadline AS application_deadline,
                university_admission.application_fee AS application_fee,
                university_admission.overall_average AS overall_average,
                university_admission.website_url AS website_url,
                university_admission.supplementary_application AS supplementary_application
            FROM university_admission
            JOIN university_information ON university_admission.university_id = university_information.id
            WHERE university_admission.university_id = $1
            `, [4])
        
        const result18 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_cost.average_cost AS average_cost,
                university_cost.average_housing_cost AS average_housing_cost,
                university_cost.average_meal_plan_cost AS average_meal_plan_cost,
                university_cost.average_domestic_tuition AS average_domestic_tuition,
                university_cost.average_internationl_cost AS average_international_cost
            FROM university_cost
            JOIN university_information ON university_cost.university_id = university_information.id
            WHERE university_cost.university_id = $1
            `, [4])
        
        const result22 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                graduation.grad_rate AS grad_rate,
                graduation.median_income AS median_income,
                graduation.employment_rate AS employment_rate
            FROM graduation
            JOIN university_information ON graduation.university_id = university_information.id
            WHERE graduation.university_id = $1
            `, [4])

        res.render('uoft.ejs', { data: result.rows, residences: result6.rows, ratings: result10.rows, admissions: result14.rows, cost: result18.rows, grad: result22.rows });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
})

app.get('/uwaterloo', async (req, res) => {
    try {
        const result2 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                majors.name AS major_name,
                university_majors.admission_average,
                university_majors.tuition_cost,
                university_majors.books_supplies
            FROM university_majors
            JOIN university_information ON university_majors.university_id = university_information.id
            JOIN majors ON university_majors.major_id = majors.id
            WHERE university_majors.university_id = $1
            `, [1])

        const result7 = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                residence.name AS residence_name,
                residence.room_type AS room_type,
                residence.capacity AS capacity, 
                residence.price_range AS price_range,
                residence.rating AS rating
            FROM residence
            JOIN university_information ON residence.university_id = university_information.id
            WHERE residence.university_id = $1
            `, [1])

        const result11 = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                university_rating.overall AS overall,
                university_rating.academics AS academics,
                university_rating.safety AS safety,
                university_rating.partying AS partying,
                university_rating.cafeteria AS cafeteria,
                university_rating.happiness AS happiness,
                university_rating.residences AS residences,
                university_rating.location AS location,
                university_rating.diversity AS diversity, 
                university_rating.affordability AS affordability,
                university_rating.employability AS employability
            FROM university_rating
            JOIN university_information ON university_rating.university_id = university_information.id
            WHERE university_rating.university_id = $1
            `, [1])
        
        const result15 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_admission.application_deadline AS application_deadline,
                university_admission.application_fee AS application_fee,
                university_admission.overall_average AS overall_average,
                university_admission.website_url AS website_url,
                university_admission.supplementary_application AS supplementary_application
            FROM university_admission
            JOIN university_information ON university_admission.university_id = university_information.id
            WHERE university_admission.university_id = $1
            `, [1])
        
        const result19 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_cost.average_cost AS average_cost,
                university_cost.average_housing_cost AS average_housing_cost,
                university_cost.average_meal_plan_cost AS average_meal_plan_cost,
                university_cost.average_domestic_tuition AS average_domestic_tuition,
                university_cost.average_internationl_cost AS average_international_cost
            FROM university_cost
            JOIN university_information ON university_cost.university_id = university_information.id
            WHERE university_cost.university_id = $1
            `, [1])
        
        const result23 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                graduation.grad_rate AS grad_rate,
                graduation.median_income AS median_income,
                graduation.employment_rate AS employment_rate
            FROM graduation
            JOIN university_information ON graduation.university_id = university_information.id
            WHERE graduation.university_id = $1
            `, [1])

        res.render('waterloo.ejs', { data2: result2.rows, residences2: result7.rows, ratings2: result11.rows, admissions2: result15.rows, cost2: result19.rows, grad2: result23.rows });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
})

app.get('/western', async (req, res) => {
    try {
        const result3 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                majors.name AS major_name,
                university_majors.admission_average,
                university_majors.tuition_cost,
                university_majors.books_supplies
            FROM university_majors
            JOIN university_information ON university_majors.university_id = university_information.id
            JOIN majors ON university_majors.major_id = majors.id
            WHERE university_majors.university_id = $1
            `, [2])

            const result8 = await pool.query(`
                SELECT 
                    university_information.name AS university_name,
                    residence.name AS residence_name,
                    residence.room_type AS room_type,
                    residence.capacity AS capacity, 
                    residence.price_range AS price_range,
                    residence.rating AS rating
                FROM residence
                JOIN university_information ON residence.university_id = university_information.id
                WHERE residence.university_id = $1
            `, [2])

        const result12 = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                university_rating.overall AS overall,
                university_rating.academics AS academics,
                university_rating.safety AS safety,
                university_rating.partying AS partying,
                university_rating.cafeteria AS cafeteria,
                university_rating.happiness AS happiness,
                university_rating.residences AS residences,
                university_rating.location AS location,
                university_rating.diversity AS diversity, 
                university_rating.affordability AS affordability,
                university_rating.employability AS employability
            FROM university_rating
            JOIN university_information ON university_rating.university_id = university_information.id
            WHERE university_rating.university_id = $1
            `, [2])
        
        const result16 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_admission.application_deadline AS application_deadline,
                university_admission.application_fee AS application_fee,
                university_admission.overall_average AS overall_average,
                university_admission.website_url AS website_url,
                university_admission.supplementary_application AS supplementary_application
            FROM university_admission
            JOIN university_information ON university_admission.university_id = university_information.id
            WHERE university_admission.university_id = $1
            `, [2])
        
        const result20 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_cost.average_cost AS average_cost,
                university_cost.average_housing_cost AS average_housing_cost,
                university_cost.average_meal_plan_cost AS average_meal_plan_cost,
                university_cost.average_domestic_tuition AS average_domestic_tuition,
                university_cost.average_internationl_cost AS average_international_cost
            FROM university_cost
            JOIN university_information ON university_cost.university_id = university_information.id
            WHERE university_cost.university_id = $1
            `, [2])

        const result24 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                graduation.grad_rate AS grad_rate,
                graduation.median_income AS median_income,
                graduation.employment_rate AS employment_rate
            FROM graduation
            JOIN university_information ON graduation.university_id = university_information.id
            WHERE graduation.university_id = $1
            `, [2])

            res.render('western.ejs', { data3: result3.rows, residences3: result8.rows, ratings3: result12.rows, admissions3: result16.rows, cost3: result20.rows, grad3: result24.rows });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
})

app.get('/queens', async (req, res) => {
    try {
        const result4 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                majors.name AS major_name,
                university_majors.admission_average,
                university_majors.tuition_cost,
                university_majors.books_supplies
            FROM university_majors
            JOIN university_information ON university_majors.university_id = university_information.id
            JOIN majors ON university_majors.major_id = majors.id
            WHERE university_majors.university_id = $1
            `, [3])
        
        const result9 = await pool.query(`
                SELECT 
                    university_information.name AS university_name,
                    residence.name AS residence_name,
                    residence.room_type AS room_type,
                    residence.capacity AS capacity, 
                    residence.price_range AS price_range,
                    residence.rating AS rating
                FROM residence
                JOIN university_information ON residence.university_id = university_information.id
                WHERE residence.university_id = $1
            `, [3])
        
        const result13 = await pool.query(`
            SELECT 
                university_information.name AS university_name,
                university_rating.overall AS overall,
                university_rating.academics AS academics,
                university_rating.safety AS safety,
                university_rating.partying AS partying,
                university_rating.cafeteria AS cafeteria,
                university_rating.happiness AS happiness,
                university_rating.residences AS residences,
                university_rating.location AS location,
                university_rating.diversity AS diversity, 
                university_rating.affordability AS affordability,
                university_rating.employability AS employability
            FROM university_rating
            JOIN university_information ON university_rating.university_id = university_information.id
            WHERE university_rating.university_id = $1
            `, [3])
        
        const result17 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_admission.application_deadline AS application_deadline,
                university_admission.application_fee AS application_fee,
                university_admission.overall_average AS overall_average,
                university_admission.website_url AS website_url,
                university_admission.supplementary_application AS supplementary_application
            FROM university_admission
            JOIN university_information ON university_admission.university_id = university_information.id
            WHERE university_admission.university_id = $1
            `, [3])

        const result21 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                university_cost.average_cost AS average_cost,
                university_cost.average_housing_cost AS average_housing_cost,
                university_cost.average_meal_plan_cost AS average_meal_plan_cost,
                university_cost.average_domestic_tuition AS average_domestic_tuition,
                university_cost.average_internationl_cost AS average_international_cost
            FROM university_cost
            JOIN university_information ON university_cost.university_id = university_information.id
            WHERE university_cost.university_id = $1
            `, [3])
        
        const result25 = await pool.query(`
            SELECT
                university_information.name AS university_name,
                graduation.grad_rate AS grad_rate,
                graduation.median_income AS median_income,
                graduation.employment_rate AS employment_rate
            FROM graduation
            JOIN university_information ON graduation.university_id = university_information.id
            WHERE graduation.university_id = $1
            `, [3])

        res.render('queens.ejs', { data4: result4.rows, residences4: result9.rows, ratings4: result13.rows, admissions4:result17.rows, cost4: result21.rows, grad4: result25.rows });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Error fetching data');
    }
})

app.listen(2000)