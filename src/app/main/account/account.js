import React, { useState, useEffect } from "react";
import { Col, Row, Input } from "antd";
import "./index.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import GoogleMapReact from "google-map-react";
import IconLocation from "assets/icon/account/icon-location.svg";
import { useDispatch, useSelector } from "react-redux";
import * as ActionUser from "./store/actions/account.action";
import withReducer from "../../store/with_reducer";
import reducer from "./store/reducers";
import moment from "moment";

const AnyReactComponent = () => (
  <div className={"textIcon"}>
    <img src={IconLocation} alt={"IconLocation"} height={40} />
  </div>
);
const Account = () => {
  const dispatch = useDispatch();
  const [center, setCenter] = useState({
    lat: 10,
    lng: 106,
  });

  const { userDetail } = useSelector((state) => state.account.account);
  // console.log("user detail :",userDetail)

  useEffect(() => {
    if (userDetail?.data !== null && userDetail?.data?.latitude !== null) {
      setCenter({
        lat: parseFloat(userDetail?.data?.latitude),
        lng: parseFloat(userDetail?.data?.longitude),
      });
    }
  }, [userDetail]);

  useEffect(() => {
    dispatch(ActionUser.getDataUserDetail());
  }, [dispatch]);
  return (
    <Col span={24} className={"container-account-infor"}>
      <Row>
        <Col span={24} className={"title-account"}>
          <span>Account information</span>
        </Col>
        <Col span={24} className={"content-account-infor"}>
          <Row>
            <Col span={24} className={"note-account"}>
              <InfoCircleOutlined className={"icon-information"} />{" "}
              <span>
                Please fill in all information so we can serve you better
              </span>
            </Col>
            <Col span={24} className={"sub-title-account"}>
              <span>Personal information</span>
            </Col>
            <Col span={24} className={"label-input-infor"}>
              <span>Full name</span>
            </Col>
            <Col span={24}>
              <Input
                value={`${userDetail?.data?.firstname} ${userDetail?.data?.lastname}`}
                className={"input-value-infor"}
              />
            </Col>

            <Col span={24} className={"label-input-infor"}>
              <span>Email (login id)</span>
            </Col>
            <Col span={24} className={"value-input-infor"}>
              <span>{userDetail?.data?.email}</span>
            </Col>

            <Col span={24} className={"label-input-infor"}>
              <span>Phone number</span>
            </Col>
            <Col span={24}>
              <Input
                value={userDetail?.data?.numberPhone}
                className={"input-value-infor"}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} className={"content-company-infor"}>
          <Row>
            <Col span={24} className={"title-account"}>
              <span>Company information</span>
            </Col>

            <Col span={24} className={"label-input-infor"}>
              <span>Company name</span>
            </Col>
            <Col span={24}>
              <Input
                value={userDetail?.data?.companyName}
                className={"input-value-infor"}
              />
            </Col>

            <Col span={24} className={"label-input-infor"}>
              <span>Address</span>
            </Col>
            <Col span={24}>
              <Input
                value={userDetail?.data?.address}
                className={"input-value-infor"}
              />
            </Col>
            <Col span={24} className={"cover-content-location"}>
              <Row>
                <Col span={15} className={"content-text-location"}>
                  <Row>
                    <Col span={24} className={"label-input-infor"}>
                      <span>Windfarm coordinates</span>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={12} className={"text-label-latlng"}>
                          <span>Latitude: </span>
                          <span className={"value-input-infor"}>
                            {userDetail?.data?.latitude}
                          </span>
                        </Col>
                        <Col span={12} className={"text-label-latlng"}>
                          <span>Longtitude: </span>
                          <span className={"value-input-infor"}>
                            {userDetail?.data?.longitude}
                          </span>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={24} className={"label-input-infor"}>
                      <span>Installed capacity</span>
                    </Col>
                    <Col span={24} className={"value-input-infor"}>
                      <span>{userDetail?.data?.installedCapacity} MW</span>
                    </Col>

                    <Col span={24} className={"label-input-infor"}>
                      <span>Total assets</span>
                    </Col>
                    <Col span={24} className={"value-input-infor"}>
                      <span>{userDetail?.data?.totalAssets}</span>
                    </Col>

                    <Col span={24} className={"label-input-infor"}>
                      <span>Start date</span>
                    </Col>
                    <Col span={24} className={"value-input-infor"}>
                      {/*<span>{userDetail?.data?.startDate}</span>*/}
                      <span>
                        {moment(
                          userDetail?.data?.startDate,
                          "YYYY-MM-DDTHH:mm:ss"
                        ).format("DD/MM/YYYY")}
                      </span>
                    </Col>

                    <Col span={24} className={"label-input-infor"}>
                      <span>End date</span>
                    </Col>
                    <Col span={24} className={"value-input-infor"}>
                      <span>
                        {moment(
                          userDetail?.data?.endDate,
                          "YYYY-MM-DDTHH:mm:ss"
                        ).format("DD/MM/YYYY")}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={9} className={"content-map-location"}>
                  <Row className={"cover-google-react-map"}>
                    {userDetail?.data !== null &&
                    userDetail?.data?.lat !== null ? (
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyD-nGKDeN0HRp9E1sH-BpHAr-de7hoc870",
                        }}
                        defaultCenter={{ lat: center.lat, lng: center.lng }}
                        defaultZoom={10}
                      >
                        <AnyReactComponent
                          lat={center.lat}
                          lng={center.lng}
                          width={50}
                        />
                      </GoogleMapReact>
                    ) : (
                      ""
                    )}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default withReducer("account", reducer)(Account);
