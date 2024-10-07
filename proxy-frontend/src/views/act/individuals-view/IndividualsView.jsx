import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import IndividualService from "../../../api/services/act/individual-service";
import { IndividualsDialog } from "../../../components/dialogs/act/individuals-dialog/IndividualsDialog";

export const ActIndividualsView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Фамилия",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Отчество",
      dataIndex: "patronymic",
      key: "patronymic",
    },
    {
      title: "Работа",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Серия",
      dataIndex: "series",
      key: "series",
    },
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <div onClick={() => updateRecordHandler(record)}>
              <EditOutlined />
            </div>
            <div onClick={() => deleteRecordHandler(record.id)}>
              <DeleteOutlined />
            </div>
          </Space>
        );
      },
    },
  ];

  const [list, setList] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const list = await IndividualService.getAllRecords();
      setList(list);
    };

    fetchData();
  }, []);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };

  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };

  const deleteRecordHandler = async (recordId) => {
    await IndividualService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <Table dataSource={list} columns={columns} />
      <Button onClick={createRecordHandler}>Создать</Button>
      <IndividualsDialog
        visible={visible}
        onOk={(record) => {
          currentRecord
            ? setList(
                list.map((it) =>
                  it.id === currentRecord.id ? { ...record } : it
                )
              )
            : setList([...list, record]);

          setCurrentRecord(null);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        currentRecord={currentRecord}
      />
    </div>
  );
};
