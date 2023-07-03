const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];

const passedVals = [cohortName];

const query = `
SELECT DISTINCT
  teachers.name AS teacher,
  cohorts.name AS cohort
FROM assistance_requests  
  JOIN teachers
    ON teachers.id = teacher_id
  JOIN students             
    ON students.id = student_id
  JOIN cohorts
    ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teachers.name
`;

pool.query(query,passedVals)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));