const CompanyService = require("../../services/act/company-service");

class CompanyController {
  async getAllRecords(req, res) {
    try {
      const list = await CompanyService.getAllRecords();
      return res.status(200).json(list);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async createRecord(req, res) {
    try {
      const record = await CompanyService.createRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async updateRecord(req, res) {
    try {
      const record = await CompanyService.updateRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async removeRecord(req, res) {
    try {
      const recordId = req.params.id;
      const record = await CompanyService.removeRecord(recordId);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new CompanyController();
