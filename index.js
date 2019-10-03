const express = require('express')
const app = express()

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const port = 3000

app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      // res.send('<pre>' + JSON.stringify(allCohorts, null, 4) + '</pre>')
      res.send('<ul>' + allCohorts.map(renderCohort).join('') + '</ul>')
    })
  })

app.get('/cohorts', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      res.send('<pre>' + JSON.stringify(allCohorts, null, 4) + '</pre>')
      // res.send('<ul>' + allCohorts.map(renderCohort).join('') + '</ul>')
    })
  })

app.get('/students', (req,res) => {
  getAllStudents()
    .then((allStudents) => {
      res.send('<pre>' + JSON.stringify(allStudents, null, 4) + '</pre>')      
    })
})

app.get('/cohorts/:slug', function (req, res) {
  getOneCohort(req.params.slug)
    .then(function (cohorts) {
      if (cohorts.length === 1) {
        res.send('<pre>' + JSON.stringify(cohorts[0]) + '</pre>')
      } else {
        res.status(404).send('cohort not found :(')
      }
    });
})

// app.post('/students', (req, res) => {
//   knex('students')
//   .insert({   name: ‘Taylor Blocker’, 
//               isActive: true,
//               cohortId: 1: 'hi@example.com' })
// })

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

function renderCohort (cohort) {
  return `
    <li><a href="/cohorts/${cohort.slug}">${cohort.title}</a></li>
  `
}



// -----------------------------------------------------
// Database Stuff

const getAllCohortsQuery = `
  SELECT *
  FROM cohorts
`

const getAllStudentsQuery = `
  SELECT *
  FROM students
`
// const insertStudentData = `
//   se
// `

function getAllCohorts () {
  return db.raw(getAllCohortsQuery)
}

function getAllStudents () {
  return db.raw(getAllStudentsQuery)
}

function getOneCohort (slug) {
  return db.raw("SELECT * FROM Cohorts WHERE slug = ?", [slug])
}

// Using the knex.js query builder syntax:
// db('Cohorts')
//   // .where({ isActive: true })
//   .then(function (cohorts) {
//     console.log(cohorts)
//   })