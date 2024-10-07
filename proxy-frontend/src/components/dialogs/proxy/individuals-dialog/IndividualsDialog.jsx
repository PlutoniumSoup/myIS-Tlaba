import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import IndividualService from "../../../../api/services/proxy/individuals-service";

export const IndividualsDialog = ({
  visible,
  onOk,
  onCancel,
  currentRecord,
  ...props
}) => {
  const [individual, setIndividual] = useState(null);

  useEffect(() => {
    if (currentRecord) {
      setIndividual(currentRecord);
    } else {
      setIndividual({
        lastName: "",
        firstName: "",
        patronymic: "",
        issued: "",
        series: "",
        number: ""
      });
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    if (!individual?.lastName || !individual?.firstName || !individual?.patronymic) {
      message.warning("Пожалуйста, укажите ФИО.");
      return;
    }

    if (individual.lastName.length > 25 || individual.firstName.length > 25 || individual.patronymic.length > 25) {
      message.warning("ФИО не должно превышать 25 символов каждое.");
      return;
    }

    if (individual.issued.length > 80) {
      message.warning("Поле 'Кем выдан документ' не должно превышать 80 символов.");
      return;
    }

    const seriesRegex = /^\d{4}$/;
    if (!seriesRegex.test(individual.series)) {
      message.warning("Серия паспорта должна состоять из 4 цифр.");
      return;
    }

    const numberRegex = /^\d{6}$/;
    if (!numberRegex.test(individual.number)) {
      message.warning("Номер паспорта должен состоять из 6 цифр.");
      return;
    }

    const record = currentRecord
      ? await IndividualService.updateRecord({
          id: currentRecord.id,
          ...individual,
        })
      : await IndividualService.createRecord(individual);
    onOk(record);
  };

  return (
    <Modal
      visible={visible}
      title={currentRecord ? "Редактировать" : "Создать"}
      onOk={onOkHandler}
      onCancel={onCancel}
    >
      <Space direction="vertical">
        <Space>
          <Input
            value={individual?.lastName || ""}
            onChange={(e) =>
              setIndividual({ ...individual, lastName: e.target.value })
            }
            placeholder="Укажите фамилию"
          />
          <Input
            value={individual?.firstName || ""}
            onChange={(e) =>
              setIndividual({ ...individual, firstName: e.target.value })
            }
            placeholder="Укажите имя"
          />
          <Input
            value={individual?.patronymic || ""}
            onChange={(e) =>
              setIndividual({ ...individual, patronymic: e.target.value })
            }
            placeholder="Укажите отчество"
          />
        </Space>
        <Input
          value={individual?.issued || ""}
          onChange={(e) =>
            setIndividual({ ...individual, issued: e.target.value })
          }
          placeholder="Укажите, кем выдан документ"
        />
        <Space align="center">
          <Input
            value={individual?.series || ""}
            onChange={(e) =>
              setIndividual({ ...individual, series: e.target.value })
            }
            placeholder="Укажите серию"
          />
          <Input
            value={individual?.number || ""}
            onChange={(e) =>
              setIndividual({ ...individual, number: e.target.value })
            }
            placeholder="Укажите номер"
          />
        </Space>
      </Space>
    </Modal>
  );
};
