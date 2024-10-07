import { DatePicker, Input, Space, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import actHeadersService from "../../../../api/services/act/actheader-service";
import dayjs from "dayjs";

const { Option } = Select;

export const ActHeadersDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  individuals,
  companies,
  ...props
}) => {
  const [actHeader, setActHeader] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setActHeader(currentRecord);
    } else {
      setActHeader(null);
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    const record = currentRecord
      ? await actHeadersService.updateRecord({
          id: currentRecord.id,
          ...actHeader,
        })
      : await actHeadersService.createRecord(actHeader);
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
        <Space>
          <Input
            value={actHeader?.number || ""}
            onChange={(e) => {
              setActHeader({ ...actHeader, number: +e.target.value });
            }}
            placeholder="Укажите номер документа"
          />
          <DatePicker
            value={
              dayjs(actHeader?.dischargeDate, "YYYY-MM-DD").isValid()
                ? dayjs(actHeader.dischargeDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date) => {
              setActHeader({
                ...actHeader,
                dischargeDate: date ? date.format("YYYY-MM-DD") : null, // сохраняем дату в нужном формате
              });
              console.log(date ? date.format("YYYY-MM-DD") : null); // выводим в консоль строку даты
            }}
            placeholder={"Укажите дату выписки"}
            style={{ width: 285 }}
            format="DD.MM.YYYY" // Исправил формат в соответствии с вашим требованием
            allowClear={false}
          />
        </Space>
        <Input
          value={actHeader?.basis || ""}
          onChange={(e) => {
            setActHeader({ ...actHeader, basis: e.target.value });
          }}
          placeholder="Укажите основание документа"
        />
        <Space style={{ width: "100%" }}>
          <Select
            value={actHeader?.individualId || null}
            onChange={(value) =>
              setActHeader({ ...actHeader, individualId: value })
            }
            placeholder={"Выберите физ. лицо"}
            style={{ width: 232 }}
          >
            {individuals.map((it) => (
              <Option value={it.id}>{it.surname}</Option>
            ))}
          </Select>

          <Select
            value={actHeader?.companyId || null}
            onChange={(value) =>
              setActHeader({ ...actHeader, companyId: value })
            }
            placeholder={"Выберите организацию"}
            style={{ width: 232 }}
          >
            {companies.map((it) => (
              <Option value={it.id}>{it.title}</Option>
            ))}
          </Select>
        </Space>
      </Space>
    </Modal>
  );
};
