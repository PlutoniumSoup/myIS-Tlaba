const CompanyModel = require("../../models/act/company-model");

class CompanyService {
  /** получить все записи из таблицы "companys" */
  async getAllRecords() {
    const list = await CompanyModel.findAll();
    return list;
  }
  /** создать запись в таблице "companys" */
  async createRecord(payload) {
    const data = await CompanyModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "companys" */
  async updateRecord(payload) {
    let record = await CompanyModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
  /** удалить запись из таблицы "companys" */
  async removeRecord(recordId) {
    const record = await CompanyModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new CompanyService();
