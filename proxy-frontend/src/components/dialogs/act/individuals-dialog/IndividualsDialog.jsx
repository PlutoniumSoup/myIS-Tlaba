import { Input, Space, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import IndividualService from "../../../../api/services/act/individual-service";

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
      setIndividual({ surname: "", name: "", patronymic: "", job: "", series: "", number: "" });
    }
  }, [currentRecord]);

  const onOkHandler = async () => {
    if (!individual?.surname || !individual?.name || !individual?.series || !individual?.number || !individual?.job) {
      message.error("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (individual.name.length > 25 || individual.surname.length > 25 || individual.patronymic.length > 25) {
      message.error("Поля с ФИО не должны быть больше 25 символов");
      return;
    }

    if (individual.job.length > 50) {
      message.error("Поле 'Работа' не должно быть больше 50 символов");
      return;
    }

    const seriesRegex = /^\d{4}$/;
    const numberRegex = /^\d{6}$/;

    if (!seriesRegex.test(individual.series)) {
      message.error("Серия должна состоять из 4 цифр.");
      return;
    }
    if (!numberRegex.test(individual.number)) {
      message.error("Номер должен состоять из 6 цифр.");
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
            value={individual?.surname || ""}
            onChange={(e) =>
              setIndividual({ ...individual, surname: e.target.value })
            }
            placeholder="Укажите фамилию"
          />
          <Input
            value={individual?.name || ""}
            onChange={(e) =>
              setIndividual({ ...individual, name: e.target.value })
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
          value={individual?.job || ""}
          onChange={(e) =>
            setIndividual({ ...individual, job: e.target.value })
          }
          placeholder="Работа"
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
