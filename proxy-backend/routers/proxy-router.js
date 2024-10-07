const Router = require("express").Router;
const ProductController = require("../controllers/proxy/product-controller");
const IndividualController = require("../controllers/proxy/individual-controller");
const OrganizationController = require("../controllers/proxy/organization-controller");
const ProxyBodyController = require("../controllers/proxy/proxy-body-controller");
const ProxyHeaderController = require("../controllers/proxy/proxy-header-controller");

const proxyRouter = new Router();

proxyRouter.get("/products", ProductController.getAllRecords);
proxyRouter.get("/individuals", IndividualController.getAllRecords);
proxyRouter.get("/organizations", OrganizationController.getAllRecords);
proxyRouter.get("/proxybodies/:headerId", ProxyBodyController.getAllHeadersRecords);
proxyRouter.get("/proxyheaders", ProxyHeaderController.getAllHeadersRecords);
proxyRouter.get("/proxyheaders/:recordId", ProxyHeaderController.getOneRecords);

proxyRouter.post("/products", ProductController.createRecord);
proxyRouter.post("/individuals", IndividualController.createRecord);
proxyRouter.post("/organizations", OrganizationController.createRecord);
proxyRouter.post("/proxybodies", ProxyBodyController.createRecord);
proxyRouter.post("/proxyheaders", ProxyHeaderController.createRecord);

proxyRouter.put("/products", ProductController.updateRecord);
proxyRouter.put("/individuals", IndividualController.updateRecord);
proxyRouter.put("/organizations", OrganizationController.updateRecord);
proxyRouter.put("/proxybodies", ProxyBodyController.updateRecord);
proxyRouter.put("/proxyheaders", ProxyHeaderController.updateRecord);

proxyRouter.delete("/products/:id", ProductController.removeRecord);
proxyRouter.delete("/individuals/:id", IndividualController.removeRecord);
proxyRouter.delete("/organizations/:id", OrganizationController.removeRecord);
proxyRouter.delete("/proxybodies/:id", ProxyBodyController.removeRecord);
proxyRouter.delete("/proxyheaders/:id", ProxyHeaderController.removeRecord);

module.exports = {proxyRouter}