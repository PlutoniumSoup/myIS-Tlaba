import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import ActBodyService from "../../../../api/services/act/actbody-service";

const { Option } = Select;

export const ActBodiesDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  materials,
  actHeaderId,
  ...props
}) => {
  const [actBody, setActBody] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setActBody(currentRecord);
    } else {
      setActBody(null);
    }
  }, [currentRecord]);

  const validateForm = () => {
    if (!actBody?.materialId) {
      message.error("Пожалуйста, выберите продукт");
      return false;
    }
    if (!actBody?.unit) {
      message.error("Пожалуйста, укажите единицу измерения");
      return false;
    }
    // Removed validation for codeByOKEI since it's optional
    if (!actBody?.count || actBody.count <= 0) {
      message.error("Пожалуйста, укажите корректное количество");
      return false;
    }
    if (!actBody?.reason) {
      message.error("Пожалуйста, укажите причину списания");
      return false;
    }
    return true;
  };

  const onOkHandler = async () => {
    if (!validateForm()) {
      return; // If validation fails, stop the function here
    }

    const record = currentRecord
      ? await ActBodyService.updateRecord({
          id: currentRecord.id,
          ...actBody,
        })
      : await ActBodyService.createRecord({
          ...actBody,
          headerId: actHeaderId,
        });

    onOk(record);
  };

  return (
    <Modal
      open={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical">
        <Select
          value={actBody?.materialId || null}
          onChange={(value) => setActBody({ ...actBody, materialId: value })}
          placeholder={"Выберите продукт"}
          style={{ width: "100%" }}
        >
          {materials.map((it) => (
            <Option key={it.id} value={it.id}>
              {it.title}
            </Option>
          ))}
        </Select>

        <Space>
          <Input
            value={actBody?.unit || ""}
            onChange={(e) => setActBody({ ...actBody, unit: e.target.value })}
            placeholder="Укажите ед. измерения"
          />
          <Input
            type="number"
            value={actBody?.codeByOKEI || ""}
            onChange={(e) =>
              setActBody({
                ...actBody,
                codeByOKEI: e.target.value ? e.target.value : null,
              })
            }
            placeholder="Укажите код по ОКЕИ"
          />
          <Input
            type="number"
            value={actBody?.count || ""}
            onChange={(e) => setActBody({ ...actBody, count: +e.target.value })}
            placeholder="Укажите количество"
          />
        </Space>

        <Input.TextArea
          value={actBody?.reason || ""}
          onChange={(e) => setActBody({ ...actBody, reason: e.target.value })}
          placeholder="Причина списания"
        />
      </Space>
    </Modal>
  );
};
