import React from "react";
import { Button, Col, Row } from "antd";
import notFound from "../../assets/img/icon_new/not-found.png";
import "./style.scss";
import { useHistory } from "react-router-dom";

export default function BodyNotFound(props) {
  const { content, buttonCreate } = props;
  const history = useHistory();
  return (
    <Row justify="center">
      <Col span={7} style={{ paddingTop: "100px" }}>
        <img width="100%" src={notFound} alt={"not-found"} />
      </Col>
      <Col
        span={24}
        style={{
          textAlign: "center",
          paddingTop: "58px",
          paddingBottom: "17px",
        }}
      >
        <Row justify="center">
          <Col span={5} className="font-text">
            {content}
          </Col>
        </Row>
      </Col>
      <Button
        type="primary"
        htmlType="submit"
        className="button-search"
        onClick={() =>
          history.push({
            pathname: "/location",
            state: { check: true },
          })
        }
      >
        {buttonCreate}
      </Button>
    </Row>
  );
}
