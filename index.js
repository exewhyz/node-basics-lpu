import express from "express";

const app = express();

const PORT = 4000;

const users = [
  {
    id: 1,
    name: "Aditya",
    email: "aniket@gmail.com",
  },
  {
    id: 2,
    name: "Aditya",
    email: "aditya@gmail.com",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Server",
  });
});


app.get("/users", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Something went wrong: ${error.message}`,
    });
  }
});

app.get("/users/:id", (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;

    const user = users.find((u) => {
      return u.id === Number(id);
    });
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Something went wrong: ${error.message}`,
    });
  }
});

app.get("/user", (req, res) => {
  try {
    const name = req.query.name;

    const sort = req.query.sort ?? "asc"; // req.query.sort ? req.query.sort : "asc"

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name is required or Invalid",
      });
    }
    const filteredUsers = users.filter((u) => {
      return u.name === name;
    });

    const sorted = filteredUsers.sort((a, b) => {
      return sort === "asc" ? a.id - b.id : b.id - a.id;
    });

    res.status(200).json({
      success: true,
      data: sorted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Something went wrong: ${error.message}`,
    });
  }
});

app.post("/users", (req, res) => {
  try {
    console.log("mdih")
    const { name, email } = req.body;

    if (!name.trim() || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const isExists = users.find((u)=>{
      return u.email === email.trim()
    })
    if(!!isExists){
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
    };
    users.push(user);
    res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Something went wrong: ${error.message}`,
    })
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
