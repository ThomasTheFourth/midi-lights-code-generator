import styled from "styled-components";

export const Container = styled("div")`
  margin: 25px;
`;

export const Tier = styled("div")`
  display: flex;
  margin-bottom: 25px;
`;
export const Led = styled("div")`
  border: ${(props) =>
    props.selected ? "2px solid white" : "1px solid white"};
  color: white;
  margin: 5px;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
`;

export const Code = styled("p")`
  color: white;
`;
