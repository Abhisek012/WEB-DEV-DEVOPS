const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const z = require("zod");

//this is same as mongoose.connect("uri")
const pool = new Pool({
  connectionString:
    "",
});

const app = express();
app.use(express.json());

const SignupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email(),
});

app.post("/signup", async (req, res) => {
  const { data, success, error } = SignupSchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      message: "Incorrect inputs",
      error: error.format(),
    });
    return;
  }

  const username = data.username;
  const email = data.email;
  const password = data.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  // console.log("INSERT INTO users (username, email, password) VALUES ('" + username + "','" + email + "','" + password + "')");

  const response = await pool.query(
    `INSERT INTO users (username , email, password) VALUES ($1, $2 , $3) RETURNING id;`,
    [username, email, hashedPassword],
  );

  console.log(response);

  res.json({
    message: "Signed up successfully",
    id: response.rows[0].id,
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await pool.query(`SELECT * FROM users WHERE email = $1  `, [
    email,
  ]);
  console.log(response);

  const userExists = response.rows[0];

  if (!userExists) {
    res.status(403).json({
      message: "Incorrect credentials",
    });
    return;
  } else {
    const correctPassword = await bcrypt.compare(password, userExists.password); //it first gets the salt from the hashed password , then appends the salt to the plaintext password , hases it and then compares
    if (correctPassword) {
      //WRITE THE JWT TOKEN LOGIC
      res.json({
        token: "jfjso",
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  }
});

app.listen(3000, () => {
  console.log(`App listening on port 3000 `);
});

//WRITE THE JWT TOKEN LOGIC
// LEARN REGEX FROM INTERNET
