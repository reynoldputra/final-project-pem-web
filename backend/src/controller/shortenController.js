import express from "express";
import { validationResult } from "express-validator";
import { checkIfAuthenticated } from "../middleware/guard/authGuard.js";
import { shortenValidator } from "../middleware/validator/shortenValidator.js";
import {
  createShorten,
  redirectShorten,
  getShorten,
  deleteShorten,
  getUrlbyAlias,
  updateShorten
} from "../service/shortenService.js";

const shortenController = express.Router();

shortenController.post(
  "/",
  [checkIfAuthenticated, shortenValidator()],
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
      console.log(err); 
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
        data: _res,
      });
    });
  } catch (err) {
    return res.send({
      status: false,
      message: err.message,
    });
  }
});

shortenController.get("/:alias", checkIfAuthenticated, async (req, res) => {
  const { alias } = req.params;
  try {
    const _res = await getUrlbyAlias(alias).then((_res) => {
      return res.send({
        data: _res,
      });
    });
  } catch (err) {
    return res.send({
      status: false,
      message: err.message,
    });
  }
});

shortenController.get("/", checkIfAuthenticated, async (req, res) => {
  try {
    const _res = await getShorten(req);
    res.send({
      status: true,
      message: "Success get short urls",
      data: _res,
    });
    return _res;
  } catch (err) {
    return res.send({
      status: false,
      message: err.message,
    });
  }
});

shortenController.delete("/:id", checkIfAuthenticated, async (req, res) => {
  console.log("test");
  const id = req.params.id;
  console.log(id);
  try {
    const _res = await deleteShorten(id, req)
    if(_res){
      res.send({
        status : true,
        message: "berhasil"
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      message: err.message,
    });
  }
});

shortenController.patch(
  "/:id",
  [checkIfAuthenticated, shortenValidator()],
  async (req, res) => {
    const { id } = req.params
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty())
        return res.send({
          status: false,
          message: "Error validation",
          data: { ...errors },
        });
      const _res = await updateShorten(req.body, id )
        if(_res)
          res.send({
            status: true,
            message: "Succes update short url"
          });
    } catch (err) {
      return res.status(400).send({
        status: false,
        message: err.message,
      });
    }
  }
);

export default shortenController;
