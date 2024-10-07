const ActHeaderModel = require("../../models/act/actheader-model");

class ActHeaderService {
  /** получить все записи из таблицы "ActHeaders" */
  async getAllRecords() {
    const list = await ActHeaderModel.findAll();
    return list;
  }
  async getOneRecords(recordId) {
    const record = await ActHeaderModel.findOne({ where: { id: recordId } });
    return record;
  }; 
  /** создать запись в таблице "ActHeaders" */
  async createRecord(payload) {
    const data = await ActHeaderModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "ActHeaders" */
  async updateRecord(payload) {
    let record = await ActHeaderModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
  /** удалить запись из таблицы "ActHeaders" */
  async removeRecord(recordId) {
    const record = await ActHeaderModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new ActHeaderService();
