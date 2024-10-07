import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import OrganizationService from "../../../../api/services/proxy/organization-service";

export const OrganizationsDialog = ({
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
    if (!organization?.title) {
      message.error("Пожалуйста, укажите наименование.");
      return;
    }

    if (organization.title.length > 50) {
      message.error("Наименование не должно превышать 50 символов.");
      return;
    }

    const innRegex = /^\d{10}$/;
    if (!innRegex.test(organization.inn)) {
      message.error("ИНН должен состоять из 10 цифр.");
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
