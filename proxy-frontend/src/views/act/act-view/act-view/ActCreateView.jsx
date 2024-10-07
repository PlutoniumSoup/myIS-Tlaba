import { DatePicker, Button, Space, Table, Select, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import ActBodyService from "../../../../api/services/act/actbody-service";
import ActHeadersService from "../../../../api/services/act/actheader-service";
import OrganizationService from "../../../../api/services/act/company-service";
import IndividualService from "../../../../api/services/act/individual-service";
import ProductService from "../../../../api/services/act/material-service";
import { ActBodiesCreateDialog } from "../../../../components/dialogs/act/act-bodies-dialog/ActBodiesCreateDialog";
import dayjs from "dayjs";

const { Option } = Select;

export const ActCreateView = ({ onOk, onClick, ...props }) => {
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
        products.find((it) => it.id === record.productId)?.title,
    },
    {
      title: "ед. изм.",
      dataIndex: "unit",
    },
    {
      title: "Количество",
      dataIndex: "count",
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

  const navigate = useNavigate();
  const { id } = useParams();
  const [actHeader, setActHeader] = useState({
    dischargeDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  });
  const [list, setList] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const list = await ActBodyService.getAllHeadersRecords(id);
      const individuals = await IndividualService.getAllRecords();
      const organizations = await OrganizationService.getAllRecords();
      const products = await ProductService.getAllRecords();

      setList(list);

      setIndividuals(individuals);
      setOrganizations(organizations);
      setProducts(products);

      return () => {
        setList([]);

        setIndividuals([]);
        setOrganizations([]);
        setProducts([]);
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
    setList(list.filter((it) => it.id !== recordId));
  };

  const saveHeader = async () => {
    await ActHeadersService.createRecord(actHeader);
  };

  const saveBody = async (id) => {
    list.forEach(async (record) => {
      record["actHeaderId"] = id;
      delete record.id;
      await ActBodyService.createRecord(record);
    });
  };

  const saveRecordHandler = async () => {
    await saveHeader();
    const allRecords = await ActHeadersService.getAllRecords();
    const id = allRecords.at(-1)["id"];
    saveBody(id);
    navigate("/");
  };

  return (
    <div style={{ padding: 16 }}>
      <div ref={componentRef}>
        <Space
          direction={"vertical"}
          align={"center"}
          style={{ width: "100%", marginBottom: 24 }}
        >
          <h2>
            <label>
              Доверенность №
              <Input
                onChange={(e) =>
                  setActHeader({ ...actHeader, number: +e.target.value })
                }
                placeholder="№"
                style={{
                  width: "65px",
                  fontWeight: "bold",
                  fontSize: "14pt",
                  marginLeft: 10,
                }}
              />
            </label>
          </h2>

          <Space>
            Дата выписки
            <DatePicker
              format="DD.MM.YYYY"
              value={
                dayjs(actHeader?.dischargeDate, "YYYY-MM-DD") || new Date()
              }
              onChange={(date) =>
                setActHeader({ ...actHeader, dischargeDate: date })
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Дата действия
            <DatePicker
              format="DD.MM.YYYY"
              value={dayjs(actHeader?.endDate, "YYYY-MM-DD") || new Date()}
              onChange={(date) =>
                setActHeader({ ...actHeader, endDate: date })
              }
              style={{ width: 232 }}
              allowClear={false}
            />
          </Space>

          <Space>
            Доверенность выдана:{" "}
            <strong>
              <Select
                value={actHeader?.organizationId || null}
                onChange={(value) =>
                  setActHeader({ ...actHeader, organizationId: value })
                }
                placeholder={"Выберите организацию"}
                style={{ width: 425 }}
              >
                {organizations.map((it) => (
                  <Option value={it.id}>{it.title}</Option>
                ))}
              </Select>
            </strong>
          </Space>

          <Space>
            Получатель:{" "}
            <strong>
              <Select
                value={actHeader?.individualId || null}
                onChange={(value) =>
                  setActHeader({ ...actHeader, individualId: value })
                }
                placeholder={"Выберите получателя"}
                style={{ width: 425 }}
              >
                {individuals.map((it) => (
                  <Option value={it.id}>
                    {it.lastName} {it.firstName} {it.patronymic}
                  </Option>
                ))}
              </Select>
            </strong>
          </Space>
        </Space>

        <Table dataSource={list} columns={columns} />
      </div>

      <Space
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createRecordHandler}>Добавить</Button>

        <Space style={{ display: "flex", gap: 10 }}>
          <Button onClick={(event) => navigate("/")}>Отменить</Button>

          <Button onClick={saveRecordHandler}>Сохранить</Button>
        </Space>
      </Space>

      <ActBodiesCreateDialog
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
        products={products}
        actHeaderId={id}
      />
    </div>
  );
};
