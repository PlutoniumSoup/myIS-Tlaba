import { DatePicker, Input, Space, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import ProxyHeadersService from "../../../api/services/proxy-header-service";
import dayjs from "dayjs";

const { Option } = Select;

export const ProxyHeadersDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  individuals,
  organizations,
  ...props
}) => {
  const [proxyHeader, setProxyHeader] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setProxyHeader(currentRecord);
    } else {
      setProxyHeader(null);
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    const record = currentRecord
      ? await ProxyHeadersService.updateRecord({
          id: currentRecord.id,
          ...proxyHeader,
        })
      : await ProxyHeadersService.createRecord(proxyHeader);
    console.log(record);
    onOk(record);
  };

  return (
    <Modal
      visible={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          value={proxyHeader?.number || ""}
          onChange={(e) => {
            setProxyHeader({ ...proxyHeader, number: +e.target.value });
          }}
          placeholder="Укажите номер документа"
        />

        <Space style={{ width: "100%" }}>
          <DatePicker
            value={
              dayjs(proxyHeader?.dischargeDate, "YYYY-MM-DD").isValid()
                ? dayjs(proxyHeader.dischargeDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date) => {
              setProxyHeader({
                ...proxyHeader,
                dischargeDate: date ? date.format("YYYY-MM-DD") : null, // сохраняем дату в нужном формате
              });
              console.log(date ? date.format("YYYY-MM-DD") : null); // выводим в консоль строку даты
            }}
            placeholder={"Укажите дату выписки"}
            style={{ width: 232 }}
            format="DD.MM.YYYY" // Исправил формат в соответствии с вашим требованием
            allowClear={false}
          />

          <DatePicker
            value={
              dayjs(proxyHeader?.endDate, "YYYY-MM-DD").isValid()
                ? dayjs(proxyHeader.endDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date) => {
              setProxyHeader({
                ...proxyHeader,
                endDate: date ? date.format("YYYY-MM-DD") : null, // сохраняем дату в нужном формате
              });
              console.log(date ? date.format("YYYY-MM-DD") : null); // выводим в консоль строку даты
            }}
            placeholder={"Укажите дату окончания"}
            style={{ width: 232 }}
            format="DD.MM.YYYY" // Исправил формат в соответствии с вашим требованием
            allowClear={false}
          />
        </Space>

        <Space style={{ width: "100%" }}>
          <Select
            value={proxyHeader?.individualId || null}
            onChange={(value) =>
              setProxyHeader({ ...proxyHeader, individualId: value })
            }
            placeholder={"Выберите физ. лицо"}
            style={{ width: 232 }}
          >
            {individuals.map((it) => (
              <Option value={it.id}>{it.lastName}</Option>
            ))}
          </Select>

          <Select
            value={proxyHeader?.organizationId || null}
            onChange={(value) =>
              setProxyHeader({ ...proxyHeader, organizationId: value })
            }
            placeholder={"Выберите организацию"}
            style={{ width: 232 }}
          >
            {organizations.map((it) => (
              <Option value={it.id}>{it.title}</Option>
            ))}
          </Select>
        </Space>
      </Space>
    </Modal>
  );
};
