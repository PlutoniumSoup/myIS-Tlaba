import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import CompanyService from "@services/act/company-service";
import CompanyService from "../../../../api/services/act/company-service";
import ActHeadersService from "../../../../api/services/act/actheader-service";
import IndividualService from "../../../../api/services/act/individual-service";
import { ActHeadersDialog } from "../../../../components/dialogs/act/act-headers-dialog/ActHeadersDialog";
import dayjs from "dayjs";

export const ActListView = ({ ...props }) => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  const [individuals, setIndividuals] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const individuals = await IndividualService.getAllRecords();
      const companies = await CompanyService.getAllRecords();
      const list = await ActHeadersService.getAllRecords();
      setIndividuals(individuals);
      setCompanies(companies);
      setList(list);
      return () => setList([]);
    }
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
    await ActHeadersService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Дата выписки",
      dataIndex: "dischargeDate",
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: "Физ. лицо",
      dataIndex: "individualId",
      render: (text, record) =>
        individuals.find((it) => it.id === record.individualId)?.surname,
    },
    {
      title: "Компания",
      dataIndex: "companyId",
      render: (text, record) =>
        companies.find((it) => it.id === record.companyId)?.title,
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
  return (
    <div style={{ padding: 16 }}>
      <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
          onDoubleClick: (event) => {
            navigate(`/act/act/${record.id}`);
          },
        })}
      />
      <Button onClick={createRecordHandler}>Создать</Button>
      <ActHeadersDialog
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
        individuals={individuals}
        companies={companies}
      />
    </div>
  );
};
