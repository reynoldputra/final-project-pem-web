import express from "express";
import { validationResult } from "express-validator";
import { checkIfAuthenticated } from "../middleware/guard/authGuard.js";
import { shoretenValidator } from "../middleware/validator/shortenValidator.js";
import { createShorten, redirectShorten } from "../service/shortenService.js";

const shortenController = express.Router();

shortenController.post(
  "/",
  [checkIfAuthenticated, shoretenValidator()],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty())
        return res.send({
          status: false,
          message: "Error validation",
          data: { ...errors },
        });
      const _res = await createShorten(
        req.body,
        req.headers.authorization
      ).then((_res) => {
        res.send({
          status: true,
          message: "Succes create short url",
          data: _res,
        });
      });
      return _res;
    } catch (err) {
      return res.send({
        status: false,
        message: err.message,
      });
    }
  }
);

shortenController.get("/in/:alias", async (req, res) => {
  const { alias } = req.params;
  try {
    const _res = await redirectShorten(alias).then((_res) => {
      return res.send({
        data: _res
      })
    });
  } catch (err) {
    return res.send({
      status: false,
      message: err.message,
    });
  }
});

shortenController.get('/', checkIfAuthenticated, async (req, res) => {
    try {
        const _res = await getShorten(req)
        res.send({
            status: true,
            message: "Succes get short urls",
            data: _res
        })
    } catch (err) {
        res.send({
            status: false,
            message: err.message
        })
    }
})

export default shortenController; 

