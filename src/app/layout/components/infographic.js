import React from "react";
import { Col, Row } from "antd";
import ig1 from "../../../assets/img/help/ig1.svg";
import ig2 from "../../../assets/img/help/ig2.svg";
import ig3 from "../../../assets/img/help/ig3.svg";
import ig4 from "../../../assets/img/help/ig4.svg";
import ig5 from "../../../assets/img/help/ig5.svg";
import checked from "../../../assets/img/help/checked.svg";

const InfoGraphic = React.memo(() => {
  return (
    <>
      <Row>
        <Col
          span={24}
          className="font-text font-weight-7 color-text-green"
          style={{ fontSize: "18px", paddingTop: 20 }}
        >
          Chọn ngành vì
        </Col>
      </Row>
      <Row>
        <Col span={14}>
          <img src={ig1} alt="ig1" />
        </Col>
        <Col
          span={10}
          className="font-text font-weight-5"
          style={{ fontSize: "16px", paddingTop: "40px", color: "#000000" }}
        >
          Mỗi ngành có những khó khăn khác nhau với thời tiết
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          offset={12}
          className="font-text font-weight-7 color-text-green"
          style={{ fontSize: "18px", paddingTop: 20 }}
        >
          Chọn khuyến nghị
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          className="font-text font-weight-5"
          style={{ fontSize: "16px", color: "#000000" }}
        >
          <div>Ứng với mỗi khó khăn có khuyến nghị để giải quyết</div>
          <div
            className="font-text color-text-green"
            style={{ fontSize: "14px" }}
          >
            Ví dụ:
          </div>
          <div style={{ position: "relative", width: "200%" }}>
            <span>
              <img src={checked} alt="checked" style={{ paddingRight: 5 }} />
            </span>
            <span
              className="font-text color-text-green"
              style={{ fontSize: "14px" }}
            >
              Dừng thi công vì mưa rất to
            </span>
          </div>
        </Col>
        <Col span={12}>
          <img src={ig2} alt="ig2" />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          className="font-text font-weight-7 color-text-green"
          style={{ fontSize: "18px", paddingTop: 20 }}
        >
          Gán địa điểm
        </Col>
      </Row>
      <Row>
        <Col span={14}>
          <img src={ig3} alt="ig3" style={{ width: "90%" }} />
        </Col>
        <Col
          span={10}
          className="font-text font-weight-5"
          style={{ fontSize: "16px", paddingTop: "40px", color: "#000000" }}
        >
          Bạn cần sử dụng khuyến nghị cho những địa điểm để phục vụ công việc
          của bạn
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          offset={12}
          className="font-text font-weight-7 color-text-green"
          style={{ fontSize: "18px", paddingTop: 20 }}
        >
          Wow... !
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          className="font-text font-weight-5"
          style={{ fontSize: "16px", paddingTop: "20px", color: "#000000" }}
        >
          Metplus sẽ cảnh báo thời tiết và khuyến nghị hành động theo điều kiện
          đã thiết lập qua <span className="color-text-green">email/zalo</span>
        </Col>
        <Col span={12} className="font-text font-weight-7 color-text-green">
          <img src={ig4} alt="ig4" />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          className="font-text font-weight-7"
          style={{ fontSize: "16px", paddingTop: "20px", color: "#000000" }}
        >
          Nếu các ngưỡng chưa phù hợp với địa điểm, bạn có thể{" "}
          <span className="color-text-green">sửa</span> và{" "}
          <span className="color-text-green">thêm</span> những{" "}
          <span className="color-text-green">
            khuyến nghị hành động của riêng mình
          </span>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <img src={ig5} alt="ig5" />
        </Col>
      </Row>
    </>
  );
});

export default InfoGraphic;
