const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const host = 'localhost';
const password = 'Qtmysql3045!';

const db = mysql.createConnection({
  host: host,
  user: 'root',
  password: password,
  database: 'minigame',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//test...
app.get('/random-number', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  db.query(
    'INSERT INTO scores (score) VALUES (?)',
    [randomNumber],
    (err, result) => {
      if (err) throw err;
      console.log('Score saved:', randomNumber);
    },
  );
  res.json({number: randomNumber});
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '21522704@gm.uit.edu.vn',
    pass: 'tkff kyiw mqon frai',
  },
});

// Routes
app.post('/register', (req, res) => {
  const {username, email, password} = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const query =
    'INSERT INTO users (username, email, password, otp) VALUES (?, ?, ?, ?)';

  db.query(query, [username, email, password, otp], err => {
    if (err) return res.status(400).send('User already exists');
    transporter.sendMail(
      {
        from: '21522704@gm.uit.edu.vn',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
      },
      error => {
        if (error) return res.status(500).send('Error sending OTP');
        res.status(200).send('OTP sent');
      },
    );
  });
});

app.post('/verify-otp', (req, res) => {
  const {username, otp} = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND otp = ?';

  db.query(query, [username, otp], (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid OTP');
    res.status(200).send('OTP Verified');
  });
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err || results.length === 0)
      return res.status(400).send('Invalid login');
    res.status(200).send('Login successful');
  });
});

// *** Routes game word sort ***
// Hàm sinh mảng chữ cái ngẫu nhiên
const generateRandomLetters = (items, min, max) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return Array(count)
    .fill(null)
    .map(() => items[Math.floor(Math.random() * items.length)]);
};

// Hàm làm sạch dữ liệu JSON
const cleanMatrix = matrix => {
  return matrix.map(row => row.map(cell => (cell === null ? null : cell)));
};

// API endpoint để lấy danh sách chữ cái dựa trên độ khó
app.get('/api/letters', (req, res) => {
  const {difficulty} = req.query;
  let items;
  if (difficulty === 'easy') items = ['A', 'E', 'X'];
  else if (difficulty === 'medium') items = ['A', 'B', 'E', 'G', 'M', 'X', 'Z'];
  else if (difficulty === 'hard')
    items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M'];

  res.json({items});
});

// API endpoint để khởi tạo ma trận
app.post('/api/initialize', (req, res) => {
  const {items} = req.body;
  const newSorting = Array(6)
    .fill(null)
    .map(() =>
      Array(4)
        .fill(null)
        .map(() =>
          Math.random() < 0.3 ? generateRandomLetters(items, 1, 5) : null,
        ),
    );

  const newWaiting = Array(1)
    .fill(null)
    .map(() =>
      Array(3)
        .fill(null)
        .map(() => generateRandomLetters(items, 1, 4)),
    );

  // Làm sạch dữ liệu trước khi lưu trữ
  const cleanedSorting = cleanMatrix(newSorting);
  const cleanedWaiting = cleanMatrix(newWaiting);

  // Ghi dữ liệu xuống cơ sở dữ liệu
  const query =
    'INSERT INTO matrices (sortingMatrix, waitingMatrix) VALUES (?, ?)';
  db.query(
    query,
    [JSON.stringify(cleanedSorting), JSON.stringify(cleanedWaiting)],
    (err, result) => {
      if (err) throw err;
      console.log('Matrices inserted into database');
    },
  );

  res.json({sortingMatrix: cleanedSorting, waitingMatrix: cleanedWaiting});
});

// API endpoint để di chuyển ô từ Waiting sang Sorting
app.post('/api/moveLetter', (req, res) => {
  const {fromRow, fromCol, toRow, toCol} = req.body;

  // Lấy ma trận hiện tại từ cơ sở dữ liệu
  const query =
    'SELECT sortingMatrix, waitingMatrix FROM matrices WHERE id = 1';
  db.query(query, (err, result) => {
    if (err) throw err;
    let sortingMatrix = JSON.parse(result[0].sortingMatrix);
    let waitingMatrix = JSON.parse(result[0].waitingMatrix);

    if (!sortingMatrix[toRow][toCol]) {
      sortingMatrix[toRow][toCol] = waitingMatrix[fromRow][fromCol];
      waitingMatrix[fromRow][fromCol] = null;
    }

    // Làm sạch dữ liệu trước khi lưu trữ
    const cleanedSorting = cleanMatrix(sortingMatrix);
    const cleanedWaiting = cleanMatrix(waitingMatrix);

    // Ghi dữ liệu cập nhật xuống cơ sở dữ liệu
    const updateQuery =
      'UPDATE matrices SET sortingMatrix = ?, waitingMatrix = ? WHERE id = 1';
    db.query(
      updateQuery,
      [JSON.stringify(cleanedSorting), JSON.stringify(cleanedWaiting)],
      (err, result) => {
        if (err) throw err;
        console.log('Matrices updated in database');
      },
    );

    res.json({sortingMatrix: cleanedSorting, waitingMatrix: cleanedWaiting});
  });
});

// API endpoint để kiểm tra trạng thái hoàn thiện của ô
app.post('/api/checkCompletion', (req, res) => {
  const {targetLetter} = req.body;

  // Lấy ma trận hiện tại từ cơ sở dữ liệu
  const query = 'SELECT sortingMatrix FROM matrices WHERE id = 1';
  db.query(query, (err, result) => {
    if (err) throw err;
    let sortingMatrix = JSON.parse(result[0].sortingMatrix);
    let progress = 0;

    sortingMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell && cell.length === 6 && new Set(cell).size === 1) {
          if (cell[0] === targetLetter) {
            progress += 6;
          }
          sortingMatrix[rowIndex][colIndex] = null;
        }
      });
    });

    // Làm sạch dữ liệu trước khi lưu trữ
    const cleanedSorting = cleanMatrix(sortingMatrix);

    // Ghi dữ liệu cập nhật xuống cơ sở dữ liệu
    const updateQuery = 'UPDATE matrices SET sortingMatrix = ? WHERE id = 1';
    db.query(updateQuery, [JSON.stringify(cleanedSorting)], (err, result) => {
      if (err) throw err;
      console.log('Matrices updated in database');
    });

    res.json({sortingMatrix: cleanedSorting, progress});
  });
});

// API endpoint để tìm ô liền kề và lấy chữ cái từ ô liền kề
app.post('/api/absorbLetters', (req, res) => {
  const {rowIndex, colIndex} = req.body;

  // Lấy ma trận hiện tại từ cơ sở dữ liệu
  const query = 'SELECT sortingMatrix FROM matrices WHERE id = 1';
  db.query(query, (err, result) => {
    if (err) throw err;
    let sortingMatrix = JSON.parse(result[0].sortingMatrix);
    let targetCell = sortingMatrix[rowIndex][colIndex];
    if (!targetCell) return res.json({sortingMatrix});

    const getAdjacentCells = (rowIndex, colIndex, matrix) => {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      return directions
        .map(([dr, dc]) => [rowIndex + dr, colIndex + dc])
        .filter(
          ([r, c]) =>
            r >= 0 && c >= 0 && r < matrix.length && c < matrix[0].length,
        );
    };

    const findMostCommonLetter = cell => {
      if (!cell || cell.length === 0) return null;
      const count = cell.reduce((acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
    };

    let hasAbsorbed = true;
    while (hasAbsorbed && targetCell.length < 6) {
      hasAbsorbed = false;
      const adjacentCells = getAdjacentCells(rowIndex, colIndex, sortingMatrix);
      for (const [adjRow, adjCol] of adjacentCells) {
        const adjacentCell = sortingMatrix[adjRow][adjCol];
        if (adjacentCell) {
          const mostCommonLetter = findMostCommonLetter(targetCell);
          const index = adjacentCell.indexOf(mostCommonLetter);
          if (index !== -1) {
            targetCell.push(adjacentCell.splice(index, 1)[0]);
            hasAbsorbed = true;
            if (targetCell.length >= 6) break;
          }
        }
      }
    }

    // Làm sạch dữ liệu trước khi lưu trữ
    const cleanedSorting = cleanMatrix(sortingMatrix);

    // Ghi dữ liệu cập nhật xuống cơ sở dữ liệu
    const updateQuery = 'UPDATE matrices SET sortingMatrix = ? WHERE id = 1';
    db.query(updateQuery, [JSON.stringify(cleanedSorting)], (err, result) => {
      if (err) throw err;
      console.log('Matrices updated in database');
    });

    res.json({sortingMatrix: cleanedSorting});
  });
});

// API endpoint để đẩy chữ cái thừa
app.post('/api/pushExcessLetter', (req, res) => {
  const {rowIndex, colIndex} = req.body;

  // Lấy ma trận hiện tại từ cơ sở dữ liệu
  const query = 'SELECT sortingMatrix FROM matrices WHERE id = 1';
  db.query(query, (err, result) => {
    if (err) throw err;
    let sortingMatrix = JSON.parse(result[0].sortingMatrix);
    const targetCell = sortingMatrix[rowIndex][colIndex];
    if (!targetCell || targetCell.length <= 6) return res.json({sortingMatrix});

    const getAdjacentCells = (rowIndex, colIndex, matrix) => {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      return directions
        .map(([dr, dc]) => [rowIndex + dr, colIndex + dc])
        .filter(
          ([r, c]) =>
            r >= 0 && c >= 0 && r < matrix.length && c < matrix[0].length,
        );
    };

    const findLeastCommonLetter = cell => {
      if (!cell || cell.length === 0) return null;
      const count = cell.reduce((acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(count).reduce((a, b) => (count[a] < count[b] ? a : b));
    };

    const leastCommonLetter = findLeastCommonLetter(targetCell);
    const adjacentCells = getAdjacentCells(rowIndex, colIndex, sortingMatrix);
    let targetAdjacentCell = adjacentCells.find(
      ([adjRow, adjCol]) => sortingMatrix[adjRow][adjCol],
    );
    if (!targetAdjacentCell) {
      targetAdjacentCell = adjacentCells.find(
        ([adjRow, adjCol]) => !sortingMatrix[adjRow][adjCol],
      );
    }
    if (targetAdjacentCell) {
      const [targetRow, targetCol] = targetAdjacentCell;
      if (!sortingMatrix[targetRow][targetCol])
        sortingMatrix[targetRow][targetCol] = [];
      sortingMatrix[targetRow][targetCol].push(leastCommonLetter);
      targetCell.splice(targetCell.indexOf(leastCommonLetter), 1);
    }

    // Làm sạch dữ liệu trước khi lưu trữ
    const cleanedSorting = cleanMatrix(sortingMatrix);

    // Ghi dữ liệu cập nhật xuống cơ sở dữ liệu
    const updateQuery = 'UPDATE matrices SET sortingMatrix = ? WHERE id = 1';
    db.query(updateQuery, [JSON.stringify(cleanedSorting)], (err, result) => {
      if (err) throw err;
      console.log('Matrices updated in database');
    });

    res.json({sortingMatrix: cleanedSorting});
  });
});

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
