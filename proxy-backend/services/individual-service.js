const IndividualModel = require("../models/individual-model");

class IndividualService {
  /** получить все записи из таблицы "individuals" */
  async getAllRecords() {
    const list = await IndividualModel.findAll();
    return list;
  }
  /** создать запись в таблице "individuals" */
  async createRecord(payload) {
    const data = await IndividualModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "individuals" */
  async updateRecord(payload) {
    let record = await IndividualModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
  /** удалить запись из таблицы "individuals" */
  async removeRecord(recordId) {
    const record = await IndividualModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new IndividualService();
