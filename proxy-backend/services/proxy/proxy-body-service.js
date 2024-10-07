const ProxyBodyModel = require("../../models/proxy/proxy-body-model");

class ProxyBodyService {
  /** получить все записи из таблицы "proxybodies" */
  async getAllHeadersRecords(headerId) {
    const records = await ProxyBodyModel.findAll({ where: {proxyHeaderId: headerId}});
    return records;
  }
  /** создать запись в таблице "proxybodies" */
  async createRecord(payload) {
    const data = await ProxyBodyModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "proxybodies" */
  async updateRecord(payload) {
    let record = await ProxyBodyModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
  /** удалить запись из таблицы "proxybodies" */
  async removeRecord(recordId) {
    const record = await ProxyBodyModel.destroy({ where: { id: recordId } });
    return record;
  }
}

module.exports = new ProxyBodyService();
