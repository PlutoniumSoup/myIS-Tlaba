const Router = require("express").Router;
const MaterialController = require("../controllers/act/material-controller");
const IndividualController = require("../controllers/act/individual-controller");
const CompanyController = require("../controllers/act/company-controller");
const ActBodyController = require("../controllers/act/actbody-controller");
const ActHeaderController = require("../controllers/act/actheader-controller")

const actRouter = new Router();

actRouter.get("/materials", MaterialController.getAllRecords);
actRouter.get("/individuals", IndividualController.getAllRecords);
actRouter.get("/companies", CompanyController.getAllRecords);
actRouter.get("/actbodies/:headerId", ActBodyController.getAllHeadersRecords);
actRouter.get("/actheaders", ActHeaderController.getAllHeadersRecords);
actRouter.get("/actheaders/:recordId", ActHeaderController.getOneRecords);

actRouter.post("/materials", MaterialController.createRecord);
actRouter.post("/individuals", IndividualController.createRecord);
actRouter.post("/companies", CompanyController.createRecord);
actRouter.post("/actbodies", ActBodyController.createRecord);
actRouter.post("/actheaders", ActHeaderController.createRecord);

actRouter.put("/materials", MaterialController.updateRecord);
actRouter.put("/individuals", IndividualController.updateRecord);
actRouter.put("/companies", CompanyController.updateRecord);
actRouter.put("/actbodies", ActBodyController.updateRecord);
actRouter.put("/actheaders", ActHeaderController.updateRecord);

actRouter.delete("/materials/:id", MaterialController.removeRecord);
actRouter.delete("/individuals/:id", IndividualController.removeRecord);
actRouter.delete("/companies/:id", CompanyController.removeRecord);
actRouter.delete("/actbodies/:id", ActBodyController.removeRecord);
actRouter.delete("/actheaders/:id", ActHeaderController.removeRecord);

module.exports = {actRouter};
