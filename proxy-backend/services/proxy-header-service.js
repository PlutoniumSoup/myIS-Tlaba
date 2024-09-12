const ProxyHeaderModel = require("../models/proxy-header-model");

class ProxyHeaderService {
  /** получить все записи из таблицы "ProxyHeaders" */
  async getAllRecords() {
    const list = await ProxyHeaderModel.findAll();
    return list;
  }
  async getOneRecords(recordId) {
    const record = await ProxyHeaderModel.findOne({ where: { id: recordId } });
    return record;
  }; 
  /** создать запись в таблице "ProxyHeaders" */
  async createRecord(payload) {
    const data = await ProxyHeaderModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "ProxyHeaders" */
  async updateRecord(payload) {
    let record = await ProxyHeaderModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
  /** удалить запись из таблицы "ProxyHeaders" */
  async removeRecord(recordId) {
    const record = await ProxyHeaderModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new ProxyHeaderService();
