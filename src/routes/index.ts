import { Router } from "express";

 const v1 = Router();

v1.use("/admin", (req, res) => {
  res.send("Admin route");
});

export { v1 };
