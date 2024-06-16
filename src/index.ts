import express from 'express';

const app = express();
const PORT = process.env.PORT || 2711;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({msg: "server is running"})
})

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`))