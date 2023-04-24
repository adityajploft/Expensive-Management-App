import React from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { useState, useEffect } from "react";
import LoadingSpenner from "../Components/LoadingSpenner";
import axios from "axios";
import moment from "moment";
import {
  UnderlineOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../Components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, SetshowModel] = useState(false);
  const [loading, setloading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectdate, setSelectdate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //  tanle antDesign tools
  const columns = [
    {
      title: "Date",
      dataIndex: "data",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refernce",
      dataIndex: "refernce",
    },

    {
      title: "Action",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              SetshowModel(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];
  // getalltranstion
  const getAllTransection = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      const res = await axios.post("/api/v1/transection/get-transection", {
        userid: user._id,
        frequency,
        selectdate,
        type,
      });
      setloading(false);
      setAllTransection(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Transetion is not added at time");
    }
  };
  // hooksuseEffect
  useEffect(() => {
    getAllTransection();
  }, [frequency, selectdate, type]);
  // Delected handler

  const handleDelete = async (record) => {
    try {
      setloading(true);
      await axios.post("/api/v1/transection/delete-transection", {
        transectionId: record._id,
      });
      setloading(false);
      message.success("message delete");
      getAllTransection();
    } catch (error) {
      setloading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };
  // handleSubmit form
  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      if (editable) {
        await axios.post("/api/v1/transection/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transectionId: editable._id,
        });
        setloading(false);
        message.success("transection Updatedsuccessful");
      } else {
        await axios.post("/api/v1/transection/add-transection", {
          ...values,
          userid: user._id,
        });
        setloading(false);
        message.success("transection Addsuccessful");
      }
      getAllTransection();
      setEditable(null);

      SetshowModel(false);
    } catch (error) {
      setloading(false);
      message.error("Faild to add transection");
    }
  };

  return (
    <>
      {loading && <LoadingSpenner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select
            value={frequency}
            onChange={(values) => {
              setFrequency(values);
              console.log(values);
            }}
          >
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker value={selectdate} />}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select
            value={type}
            onChange={(values) => {
              setType(values);
              console.log(values);
            }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker value={selectdate} />}
        </div>
        <div className="switch-icon">
          <div className="mx-2">
            <UnderlineOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => SetshowModel(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={allTransection}
            onChange={(values) => setSelectdate(values)}
          />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add transaction"}
        open={showModel}
        onCancel={() => SetshowModel(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="Tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bill">Bill</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refernce" name="refernce">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Desciption" name="desciption">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">SAVE</button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default HomePage;
