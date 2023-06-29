SELECT name, email, phone
FROM students
WHERE NOT end_date IS NULL
AND github IS NULL;