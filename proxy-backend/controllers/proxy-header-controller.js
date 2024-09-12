const ProxyHeaderService = require("../services/proxy-header-service");

class ProxyHeaderController {
  async getAllHeadersRecords(req, res) {
    try {
      const records = await ProxyHeaderService.getAllRecords();
      return res.status(200).json(records);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async getOneRecords(req, res) {
    try {
      const record = await ProxyHeaderService.getOneRecords(req.params.recordId);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async createRecord(req, res) {
    try {
      const record = await ProxyHeaderService.createRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async updateRecord(req, res) {
    try {
      const record = await ProxyHeaderService.updateRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async removeRecord(req, res) {
    try {
      const recordId = req.params.id;
      const record = await ProxyHeaderService.removeRecord(recordId);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new ProxyHeaderController();
