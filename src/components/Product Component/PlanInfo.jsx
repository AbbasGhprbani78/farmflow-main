import { Row, Col } from "react-bootstrap";

export function PlanInfo({
  quality = "",
  amount = "",
  title = "",
  children,
  className = "",
  pClassName = "",
}) {
  return (
    <Col xs={12} sm={4} className={pClassName}>
      <div className={`w-100 mt ${className}`}>
        <Row className="flex-row">
          <Col xs={4} className="firstInfo">
            {children}
            <span className="fs-3 ">{amount}</span>
          </Col>
          <Col xs={8} className="secInfo">
            <h5>{title}</h5>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
