const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const search_string = process.argv[2];
const limit = process.argv[3] || 5;
const passedVals = [`%${search_string}%`, limit];

const query = `
SELECT students.id AS student, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool.query(query,passedVals)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));