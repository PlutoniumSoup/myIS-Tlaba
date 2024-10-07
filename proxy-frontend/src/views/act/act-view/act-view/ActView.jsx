import { DatePicker, Button, Space, Table, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import ActBodyService from "../../../../api/services/act/actbody-service";
import ActHeadersService from "../../../../api/services/act/actheader-service";
import CompanyService from "../../../../api/services/act/company-service";
import IndividualService from "../../../../api/services/act/individual-service";
import MaterialService from "../../../../api/services/act/material-service";
import { ActBodiesDialog } from "../../../../components/dialogs/act/act-bodies-dialog/ActBodiesDialog";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";

const { Option } = Select;

export const ActView = ({ onOk, onClick, ...props }) => {
  const columns = [
    {
      title: "Код",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Наименование",
      key: "title",
      render: (text, record) =>
        materials.find((it) => it.id === record.materialId)?.title,
    },
    {
      title: "Код по ОКЕИ",
      dataIndex: "codeByOKEI",
    },
    {
      title: "Единица измерения",
      dataIndex: "unit",
    },
    {
      title: "Количество",
      dataIndex: "count",
    },
    {
      title: "Учетная стоимость",
      dataIndex: "cost",
      render: (text, record) => {
        const material = materials.find((it) => it.id === record.materialId);
        return material ? (+material.cost * record.count).toFixed(2) : null;
      },
    },
    {
      title: "Причина списания",
      dataIndex: "reason",
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { id } = useParams();
  const [act, setAct] = useState(null);
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const act = await ActHeadersService.getOneRecord(id);
      const list = await ActBodyService.getAllHeadersRecords(id);
      const individuals = await IndividualService.getAllRecords();
      const companies = await CompanyService.getAllRecords();
      const materials = await MaterialService.getAllRecords();

      setList(list);
      setAct(act);

      setIndividuals(individuals);
      setCompanies(companies);
      setMaterials(materials);

      return () => {
        setList([]);
        setAct(null);

        setIndividuals([]);
        setCompanies([]);
        setMaterials([]);
      };
    }
    fetchData();
  }, [id]);

  const createRecordHandler = () => {
    setCurrentRecord(null);
    setVisible(true);
  };
  const updateRecordHandler = (record) => {
    setCurrentRecord(record);
    setVisible(true);
  };
  const deleteRecordHandler = async (recordId) => {
    await ActBodyService.removeRecord(recordId);
    setList(list.filter((it) => it.id !== recordId));
  };

  return (
    <div style={{ padding: 16 }}>
      <div ref={componentRef}>
        <Space
          direction={"horizontal"}
          style={{
            width: "960px",
            marginBottom: 24,
            justifyContent: "space-between",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <Space direction={"vertical"}>
            <Select
              value={act?.companyId || null}
              onChange={(value) =>
                setAct(
                  { ...act, companyId: value },
                  ActHeadersService.updateRecord({
                    ...act,
                    companyId: value,
                  })
                )
              }
              placeholder={"Выберите организацию"}
              style={{ width: 200 }}
            >
              {companies.map((it) => (
                <Option value={it.id}>{it.title}</Option>
              ))}
            </Select>
            <Space>
              <div>ИНН</div>
              {companies.find((it) => it.id === act?.companyId)?.inn}
            </Space>
          </Space>

          <Space direction={"vertical"}>
            <div>Утверждаю</div>
            <Space>
              {individuals.find((it) => it.id === act?.individualId)?.job}{" "}
              {companies.find((it) => it.id === act?.companyId)?.title}
            </Space>
            <Select
              value={act?.individualId || null}
              onChange={(value) =>
                setAct(
                  { ...act, individualId: value },
                  ActHeadersService.updateRecord({
                    ...act,
                    individualId: value,
                  })
                )
              }
              placeholder={"Выберите организацию"}
              style={{ width: 200 }}
            >
              {individuals.map((it) => (
                <Option value={it.id}>
                  {it.surname} {it.name[0]}. {it.patronymic[0]}.
                </Option>
              ))}
            </Select>
          </Space>
        </Space>
        <Space
          align={"center"}
          direction={"vertical"}
          style={{ width: "100%" }}
        >
          <h2>
            АКТ о списании материальных ценностей №{" "}
            <strong>{act?.number}</strong>
          </h2>
        </Space>

        <Space
          direction={"vertical"}
          style={{
            width: "960px",
            marginBottom: 24,
            justifyContent: "space-between",
            margin: "0 auto",
            display: "flex",
            paddingBlock: "16px",
          }}
        >
          <Space>Основание для составления акта: </Space>
          <Space>{act?.basis}</Space>
        </Space>
        <Table
          dataSource={list}
          columns={columns}
          summary={() => {
            const totalCost = list.reduce((acc, record) => {
              const material = materials.find(
                (it) => it.id === record.materialId
              );
              return acc + (material ? +material.cost * record.count : 0);
            }, 0);

            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  Сумма к списанию {totalCost.toFixed(2)}
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />

        <Space>
          Дата списания
          <DatePicker
            format="DD.MM.YYYY"
            value={dayjs(act?.dischargeDate, "YYYY-MM-DD") || null}
            onChange={(date) =>
              setAct(
                {
                  ...act,
                  dischargeDate: date ? date.format("YYYY-MM-DD") : null,
                },
                ActHeadersService.updateRecord({
                  ...act,
                  dischargeDate: date ? date.format("YYYY-MM-DD") : null,
                })
              )
            }
            style={{ width: 232 }}
            allowClear={false}
          />
        </Space>
      </div>

      <Space style={{ paddingBlock: "20px" }}>
        <Button onClick={createRecordHandler}>Создать</Button>
        <Button type="dashed" onClick={handlePrint}>
          Печать
        </Button>
      </Space>

      <ActBodiesDialog
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
        materials={materials}
        actHeaderId={id}
      />
    </div>
  );
};
