const ProductModel = require("../models/product-model");

class ProductService {
  /** получить все записи из таблицы "products" */
  async getAllRecords() {
    const list = await ProductModel.findAll();
    return list;
  }
  /** создать запись в таблице "products" */
  async createRecord(payload) {
    const data = await ProductModel.create(payload);
    return data;
  }
  /** обновить запись в таблице "products" */
  async updateRecord(payload) {
    let record = await ProductModel.findOne({ where: { id: payload.id } });
    if (!record) {
      throw new Error("Record not found");
    }
    // Используем метод set для обновления всех полей сразу
    record.set(payload);
    return await record.save();
  }
}

module.exports = new ProductService();
