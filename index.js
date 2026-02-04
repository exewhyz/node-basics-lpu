import express from "express";

const app = express();

const PORT = 4000;

const users = [
  {
    id: 1,
    name: "Aniket",
    email: "aniket@gmail.com",
  },
  {
    id: 2,
    name: "Aditya",
    email: "aditya@gmail.com",
  },
];

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
    if(!user){
        return res.status(404).json({
            success: true,
            message: "User not found",
            data: null
        })
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
