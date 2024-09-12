const Router = require("express").Router;
const ProductController = require("../controllers/product-controller");
const IndividualController = require("../controllers/individual-controller");
const OrganizationController = require("../controllers/organization-controller");
const ProxyBodyController = require("../controllers/proxy-body-controller");
const ProxyHeaderController = require("../controllers/proxy-header-controller")

const router = new Router();

router.get("/products", ProductController.getAllRecords);
router.get("/individuals", IndividualController.getAllRecords);
router.get("/organizations", OrganizationController.getAllRecords);
router.get("/proxybodies/:headerId", ProxyBodyController.getAllHeadersRecords);
router.get("/proxyheaders", ProxyHeaderController.getAllHeadersRecords);
router.get("/proxyheaders/:recordId", ProxyHeaderController.getOneRecords);

router.post("/products", ProductController.createRecord);
router.post("/individuals", IndividualController.createRecord);
router.post("/organizations", OrganizationController.createRecord);
router.post("/proxybodies", ProxyBodyController.createRecord);
router.post("/proxyheaders", ProxyHeaderController.createRecord);

router.put("/products", ProductController.updateRecord);
router.put("/individuals", IndividualController.updateRecord);
router.put("/organizations", OrganizationController.updateRecord);
router.put("/proxybodies", ProxyBodyController.updateRecord);
router.put("/proxyheaders", ProxyHeaderController.updateRecord);

router.delete("/products/:id", ProductController.removeRecord);
router.delete("/individuals/:id", IndividualController.removeRecord);
router.delete("/organizations/:id", OrganizationController.removeRecord);
router.delete("/proxybodies/:id", ProxyBodyController.removeRecord);
router.delete("/proxyheaders/:id", ProxyHeaderController.removeRecord);

module.exports = router;
