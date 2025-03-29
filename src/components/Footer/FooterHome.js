import React from "react";
import { Col, Row } from "antd";
import { isMobile } from "react-device-detect";
import Logo from "../../assets/img/icon_new/logo_light.png";
import imgAppStore from "../../assets/img/icon_new/Download_on_the_App_Store.png";
import imgGooglePlay from "../../assets/img/icon_new/Google_Play_Store.png";
import apiConfig from "../../app/configs/api.config";

const FooterHome = () => {
  return (
    <Row className={"layout-footer-home-page"} id={"contact"}>
      <Col span={24} className={"main-container-footer-home-page"}>
        <Row justify={"space-between"}>
          <Col
            span={!isMobile ? 6 : 24}
            style={
              !isMobile
                ? { paddingRight: "20px" }
                : { padding: "30px 20px 30px 0px" }
            }
          >
            <Row>
              <Col span={24}>
                <a href={apiConfig.domainHome}>
                  <img src={Logo} alt={"logo_weatherplus"} />
                </a>
              </Col>
            </Row>
          </Col>
          <Col span={!isMobile ? 9 : 24}>
            <Row style={{ paddingRight: "45px" }}>
              <Col span={24} className={"title-footer-home-page"}>
                CÔNG TY CỔ PHẦN GIẢI PHÁP THỜI TIẾT WEATHERPLUS
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>Mã số doanh nghiệp: 0106597121</span>
              </Col>
              <br />
              <Col span={24} className={"text-footer-home-page"}>
                <span>
                  Cấp bởi: Phòng Đăng ký kinh doanh - Sở Kế hoạch và đầu tư
                  Thành phố Hà Nội ngày 09/07/2014
                </span>
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>Người đại diện theo pháp luật: Ông Tô Đức Hải</span>
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>
                  Giấy phép hoạt động dự báo, cảnh báo khí tượng thuỷ văn số 01
                  năm 2017 do Bộ Tài nguyên và môi trường cấp ngày 03/04/2017
                </span>
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>
                  Giấy phép hoạt động dự báo, cảnh báo khí tượng thuỷ văn (sửa
                  đổi lần thứ nhất) số: 14/GP-BTNMT do Bộ Tài nguyên và môi
                  trường cấp ngày 21/01/2021.
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={!isMobile ? 9 : 24}>
            <Row style={{ paddingLeft: "30px" }}>
              <Col span={24} className={"title-footer-home-page"}>
                <span>Thông tin liên hệ</span>
                <br />
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>
                  Tầng 18, Tháp A, Tòa nhà Sông Đà, Phạm Hùng, Nam Từ Liêm, Hà
                  Nội
                </span>
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>(+84) 24 37 955 069</span>
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>(+84) 822 091 091</span>
              </Col>
              <Col span={24} className={"text-footer-home-page"}>
                <span>contact@weatherplus.vn</span>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <a
                      href={
                        "https://apps.apple.com/vn/app/metplus-th%E1%BB%9Di-ti%E1%BA%BFt-tin-c%E1%BA%ADy/id1661769860?platform=iphone"
                      }
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <img src={imgAppStore} alt={"imgAppStore"} />
                    </a>
                  </Col>
                  <Col span={12}>
                    <a
                      href={
                        "https://play.google.com/store/apps/details?id=com.weatherplus.metplus&hl=en&gl=US"
                      }
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                    >
                      <img src={imgGooglePlay} alt={"imgGooglePlay"} />
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default FooterHome;
