SELECT count(*) AS total_assistances, name
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
WHERE name = 'Waylon Boehm'
GROUP BY teachers.id