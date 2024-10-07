import { Input, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import ProductService from "../../../../api/services/proxy/product-service";

export const ProductsDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  ...props
}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (currentRecord) {
      setTitle(currentRecord.title);
    } else {
      setTitle("");
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    if (!title) {
      message.error("Пожалуйста, укажите наименование.");
      return;
    }

    if (title.length > 50) {
      message.error("Наименование не должно превышать 50 символов.");
      return;
    }

    const record = currentRecord
      ? await ProductService.updateRecord({
          id: currentRecord.id,
          title,
        })
      : await ProductService.createRecord({ title });
    onOk(record);
  };

  return (
    <Modal
      visible={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Укажите наименование"
      />
    </Modal>
  );
};
