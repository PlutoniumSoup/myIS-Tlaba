const ActBodyModel = require("../../models/act/actbody-model");

class ActBodyService {
  /** получить все записи из таблицы "actbodies" */
  async getAllHeadersRecords(headerId) {
    const records = await ActBodyModel.findAll({ where: {headerId: headerId}});
    return records;
  }
  /** создать запись в таблице "actbodies" */
  async createRecord(payload) {
    const data = await ActBodyModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "actbodies" */
  async updateRecord(payload) {
    let record = await ActBodyModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
  /** удалить запись из таблицы "actbodies" */
  async removeRecord(recordId) {
    const record = await ActBodyModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new ActBodyService();
