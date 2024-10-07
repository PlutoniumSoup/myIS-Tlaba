import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import OrganizationService from "../../../../api/services/act/company-service";

export const CompaniesDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  ...props
}) => {
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setOrganization(currentRecord);
    } else {
      setOrganization({ title: "", inn: "" });
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    if (!organization?.title || !organization?.inn) {
      message.error("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const innRegex = /^\d{10}$/; 
    if (!innRegex.test(organization.inn)) {
      message.error("ИНН должен состоять из 10 цифр");
      return;
    }

    const record = currentRecord
      ? await OrganizationService.updateRecord({
          id: currentRecord.id,
          ...organization,
        })
      : await OrganizationService.createRecord(organization);
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
          value={organization?.title || ""}
          onChange={(e) =>
            setOrganization({ ...organization, title: e.target.value })
          }
          placeholder="Укажите наименование"
        />
        <Input
          value={organization?.inn || ""}
          onChange={(e) =>
            setOrganization({ ...organization, inn: e.target.value })
          }
          placeholder="Укажите ИНН"
        />
      </Space>
    </Modal>
  );
};
