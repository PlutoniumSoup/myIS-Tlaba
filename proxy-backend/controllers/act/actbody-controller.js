const ActBodyService = require("../../services/act/actbody-service");

class ActBodyController {
  async getAllHeadersRecords(req, res) {
    try {
      const list = await ActBodyService.getAllHeadersRecords(req.params.headerId);
      return res.status(200).json(list);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async createRecord(req, res) {
    try {
      const record = await ActBodyService.createRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async updateRecord(req, res) {
    try {
      const record = await ActBodyService.updateRecord(req.body);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async removeRecord(req, res) {
    try {
      const recordId = req.params.id;
      const record = await ActBodyService.removeRecord(recordId);
      return res.status(200).json(record);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new ActBodyController();
