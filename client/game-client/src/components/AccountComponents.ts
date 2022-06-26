import styled from "styled-components";

export const TextSection = styled.section`
  color: aliceblue;
  background-color: #3e435e;
  border-radius: 15px;
  font-size: 16px;
  width: 400px;
  height: 220px;
  left: 149px;
  top: 223px;
`;

export const Row = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  column-count: 4;
  column-gap: 30px;
`;

export const Col = styled.div`
  flex-basis: 50%;
`;

export const StatsShape = styled.div`
  color: aliceblue;
  background-color: #3e435e;
  border-radius: 15px;
  font-size: 16px;
  width: 400px;
  height: 220px;
  left: 149px;
  top: 223px;
`;

export const TextHeader = styled.h1`
  position: absolute;
  width: 258px;
  height: 39px;
  left: 105px;
  top: 228.2px;
  font-weight: 700;
  font-size: 20px;
  line-height: 39px;
  text-align: center;
  color: #ffffff;
`;

export const HR = styled.hr`
  border: 0.6px solid rgba(197, 196, 221, 0.2);
  width: 89%;
  height: 0px;
  margin-left: 20px;
`;

export const ChangedTextHeader = styled.h1`
  position: absolute;
  width: 258px;
  height: 39px;
  top: 470px;
  left: 116px;
  font-weight: 700;
  font-size: 20px;
  line-height: 39px;
  text-align: center;
  color: #ffffff;
`;

export const StatsChangedShape = styled.div`
  color: aliceblue;
  background-color: #3e435e;
  border-radius: 15px;
  font-size: 16px;
  width: 530px;
  height: 470px;
  left: 558px;
  top: 222.4px;
`;

export const NotCentredHeader = styled.h1`
  text-align: left;
  margin-left: 30px;
  margin-top: 30px;
  font-size: 28px;
`;

export const ChangedPStats = styled.p`
  color: darkgray;
  max-width: 280px;
  margin-left: 30px;
  margin-top: 15px;
`;

export const Circle = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 30px;
  margin-left: 200px;
  background: #d9d9d9;
  border-radius: 100%;
`;

export const CentredChangedHeader = styled.p`
  text-align: center;
  margin-top: 15px;
`;

export const CentredChangedP = styled.p`
  color: darkgray;
  text-align: center;
  margin-left: 170px;
  margin-top: 15px;
  max-width: 170px;
`;

/*
#stats-changed-shape
{
    width: 530px;
    height: 470px;
    left: 558px;
    top: 222.4px;
}
.text-header-stats
{
    position: absolute;
    width: 258px;
    height: 39px;
    left: 105px;
    top: 228.2px;
    font-weight: 700;
    font-size:20px;
    line-height: 39px;
    text-align: center;
    color: #FFFFFF;
}
#changed-text-header-stats
{
    top: 470px;
    left: 116px;
}
.stats-hr
{
    border: 0.6px solid rgba(197, 196, 221, 0.2);
    width: 89%;
    height: 0px;
    margin-left: 20px;
}
#not-centered-header
{
    text-align: left;
    margin-left: 30px;
    margin-top: 30px;
    font-size: 28px;
}
#changed-p-stats
{
    max-width: 280px;
    margin-left: 30px;
    margin-top: 15px;
}
/* Ellipse
.circle
{
    width: 100px;
    height: 100px;
    margin-top: 30px;
    margin-left: 200px;
    background: #D9D9D9;
    border-radius: 100%;
}
#centered-changed-header
{
    margin-top: 15px;
}
#centered-changed-p-stats
{
    text-align: center;
    margin-left: 170px;
    margin-top: 15px;
    max-width: 170px;
}
*/
