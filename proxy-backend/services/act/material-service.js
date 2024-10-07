const MaterialModel = require("../../models/act/material-model");

class MaterialService {
  /** получить все записи из таблицы "materials" */
  async getAllRecords() {
    const list = await MaterialModel.findAll();
    return list;
  }
  /** создать запись в таблице "materials" */
  async createRecord(payload) {
    const data = await MaterialModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "materials" */
  async updateRecord(payload) {
    let record = await MaterialModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
}

module.exports = new MaterialService();
