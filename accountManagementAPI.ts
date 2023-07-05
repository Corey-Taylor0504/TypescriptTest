import express from "express";

interface Account {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

let accounts: Account[] = [];

const app = express();
app.use(express.json());

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.post("/accounts", (req, res) => {
  const newAccount: Account = req.body;
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

app.put("/accounts/:id", (req, res) => {
  const accountId = req.params.id;
  const updatedAccount: Account = req.body;

  const index = accounts.findIndex((account) => account.id === accountId);
  if (index === -1) {
    res.status(404).send("Account not found");
  } else {
    accounts[index] = { ...accounts[index], ...updatedAccount };
    res.json(accounts[index]);
  }
});

app.delete("/accounts/:id", (req, res) => {
  const accountId = req.params.id;

  const index = accounts.findIndex((account) => account.id === accountId);
  if (index === -1) {
    res.status(404).send("Account not found");
  } else {
    const deletedAccount = accounts.splice(index, 1)[0];
    res.json(deletedAccount);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
