import express from "express";
const router = express.Router();
export default router;

import {
  getEmployees,
  createEmployee,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res.status(400).send("Employee needs a name, birthday, and salary.");
  }

  const employee = await createEmployee({ name, birthday, salary });
  res.status(201).send(employee);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await getEmployee(id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await deleteEmployee(id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }

  const { id } = req.params;
  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res.status(400).send("Employee needs a name, birthday, and salary.");
  }

  const employee = await updateEmployee({ id, name, birthday, salary });

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});
