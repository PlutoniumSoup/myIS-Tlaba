import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from "antd";

const { Option } = Select;
let localId = 0;

export const ActBodiesCreateDialog = ({
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

  const onOkHandler = async () => {
    const record = {
      id: localId,
      materialId: actBody.materialId,
      count: actBody.count,
      unit: actBody.unit,
    };
    onOk(record);
    setActBody(null);
    localId += 1;
  };

  return (
    <Modal
      visible={visible}
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
            <Option value={it.id}>{it.title}</Option>
          ))}
        </Select>

        <Space>
          <Input
            value={actBody?.unit || ""}
            onChange={(e) =>
              setActBody({ ...actBody, unit: e.target.value })
            }
            placeholder="Укажите ед. измерения"
          />

          <Input
            value={actBody?.count || ""}
            onChange={(e) =>
              setActBody({ ...actBody, count: +e.target.value })
            }
            placeholder="Укажите количество"
          />
        </Space>
      </Space>
    </Modal>
  );
};
