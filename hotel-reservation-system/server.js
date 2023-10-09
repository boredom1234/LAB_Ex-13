const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'HOTEL',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Example route for searching available rooms
app.get('/search-rooms', (req, res) => {
  const { checkInDate, checkOutDate, roomType, occupancy } = req.query;

  // Write the MySQL query to find available rooms based on user input
  const query = `SELECT * FROM rooms`;

  // Values to be inserted into the query
  const values = [roomType, occupancy, checkInDate, checkOutDate]; // Fixed the order of checkInDate and checkOutDate

  // Execute the query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'An error occurred while fetching rooms.' });
    } else {
      // Send the results back to the client
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//LINK: https://github.com/boredom1234/LAB_Ex-13