import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import ProxyBodyService from "../../../../api/services/proxy/proxy-body-service";

const { Option } = Select;

export const ProxyBodiesDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  products,
  proxyHeaderId,
  ...props
}) => {
  const [proxyBody, setProxyBody] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setProxyBody(currentRecord);
    } else {
      setProxyBody({
        productId: null,
        unit: "",
        count: ""
      });
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    if (!proxyBody?.productId) {
      message.warning("Пожалуйста, выберите продукт.");
      return;
    }

    if (!proxyBody?.unit || proxyBody.unit.length > 50) {
      message.warning("Поле 'Ед. измерения' не должно превышать 50 символов.");
      return;
    }

    if (!proxyBody?.count || isNaN(proxyBody.count) || Number(proxyBody.count) <= 0) {
      message.warning("Пожалуйста, укажите корректное количество.");
      return;
    }

    const record = currentRecord
      ? await ProxyBodyService.updateRecord({
          id: currentRecord.id,
          ...proxyBody,
        })
      : await ProxyBodyService.createRecord({ ...proxyBody, proxyHeaderId });
    onOk(record);
  };

  return (
    <Modal
      open={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          value={proxyBody?.productId || null}
          onChange={(value) => setProxyBody({ ...proxyBody, productId: value })}
          placeholder={"Выберите продукт"}
          style={{ width: "100%" }}
        >
          {products.map((it) => (
            <Option key={it.id} value={it.id}>{it.title}</Option>
          ))}
        </Select>

        <Space>
          <Input
            value={proxyBody?.unit || ""}
            onChange={(e) =>
              setProxyBody({ ...proxyBody, unit: e.target.value })
            }
            placeholder="Укажите ед. измерения"
          />

          <Input
            value={proxyBody?.count || ""}
            onChange={(e) =>
              setProxyBody({ ...proxyBody, count: e.target.value })
            }
            placeholder="Укажите количество"
          />
        </Space>
      </Space>
    </Modal>
  );
};
