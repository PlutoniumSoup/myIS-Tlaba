const ActHeaderService = require("../../services/act/actheader-service");

class ActHeaderController {
  async getAllHeadersRecords(req, res) {
    try {
      const records = await ActHeaderService.getAllRecords();
      return res.status(200).json(records);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async getOneRecords(req, res) {
    try {
      const record = await ActHeaderService.getOneRecords(req.params.recordId);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async createRecord(req, res) {
    try {
      const record = await ActHeaderService.createRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async updateRecord(req, res) {
    try {
      const record = await ActHeaderService.updateRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async removeRecord(req, res) {
    try {
      const recordId = req.params.id;
      const record = await ActHeaderService.removeRecord(recordId);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new ActHeaderController();
