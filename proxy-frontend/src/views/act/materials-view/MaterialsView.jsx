import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import MaterialService from "../../../api/services/act/material-service";
import { MaterialsDialog } from "../../../components/dialogs/act/materials-dialog/MaterialsDialog";

export const MaterialsView = ({ ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Стоимость, руб.",
      dataIndex: "cost",
      key: "cost",
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
      const list = await MaterialService.getAllRecords();
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
    await MaterialService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <Table dataSource={list} columns={columns} />
      <Button onClick={createRecordHandler}>Создать</Button>
      <MaterialsDialog
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
