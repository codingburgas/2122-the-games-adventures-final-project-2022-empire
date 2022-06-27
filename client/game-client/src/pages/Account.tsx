import { useContext } from "react";
import { UserContext } from "../App";
import {
  ChangedTextHeader,
  Col,
  HR,
  NotCentredHeader,
  Row,
  StatsChangedShape,
  StatsShape,
  TextHeader,
  TextSection,
  ChangedPStats,
  Circle,
  CentredChangedHeader,
  CentredChangedP,
} from "../components/AccountComponents";
import { NavBar } from "../components/NavBar";
import { FirstGradient } from "./indexStyles";

function Account() {
  const userContext = useContext(UserContext);

  return (
    <FirstGradient>
      <NavBar hasUserRegistered={true}/>
      <TextSection>
        <Row>
          <Col>
            <StatsShape>
              <TextHeader>My information</TextHeader>
              <br />
              <br />
              <br />
              <HR />
            </StatsShape>
            <Row>
              <StatsShape>
                <ChangedTextHeader>Other information</ChangedTextHeader>
                <br />
                <br />
                <br />
                <HR />
              </StatsShape>
            </Row>
          </Col>
          <StatsChangedShape>
            <NotCentredHeader>My profile</NotCentredHeader>
            <ChangedPStats>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </ChangedPStats>
            <Circle/>
            <CentredChangedHeader>
              Welcome back {userContext?.userData?.username}
            </CentredChangedHeader>
            <CentredChangedP>
              We are happy to see you back here
            </CentredChangedP>
          </StatsChangedShape>
        </Row>
      </TextSection>
    </FirstGradient>
  );
}

export default Account;
