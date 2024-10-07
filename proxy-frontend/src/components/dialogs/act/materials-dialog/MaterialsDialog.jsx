import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import MaterialService from "../../../../api/services/act/material-service";

export const MaterialsDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  ...props
}) => {
  const [materials, setMaterials] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setMaterials(currentRecord);
    } else {
      setMaterials({ title: "", cost: "" });
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    if (!materials?.title || !materials?.cost) {
      message.error("Пожалуйста, заполните все обязательные поля."); 
      return;
    }

    const record = currentRecord
      ? await MaterialService.updateRecord({
          id: currentRecord.id,
          ...materials,
        })
      : await MaterialService.createRecord(materials);
    onOk(record);
  };

  const handleCostChange = (e) => {
    const value = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/; 

    if (value === "" || regex.test(value)) {
      setMaterials({ ...materials, cost: value });
    }
  };

  return (
    <Modal
      visible={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          value={materials?.title || ""}
          onChange={(e) => {
            setMaterials({ ...materials, title: e.target.value });
          }}
          placeholder="Укажите наименование"
        />
        <Input
          type="text"
          value={materials?.cost || ""}
          onChange={handleCostChange}
          placeholder="Укажите стоимость"
        />
      </Space>
    </Modal>
  );
};
