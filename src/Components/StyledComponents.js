import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";

export const MyButton = styled(Button)`
  text-transform: none !important;
  font-family: Arial !important;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px !important;
  text-align: center;
  background-color: ${props =>
    props.disabled ? "#E5E9ED" : "#4C84FF"} !important;
  border-radius: 100px !important;
  color: ${props => (props.disabled ? "#A4AFBF" : "#ffffff")} !important;
  justify-self: center;
  width: ${props => props.width}px !important;
  height: ${props => props.height}px !important;
  :hover {
    background-color: #1a62ff !important;
  }
`;

export const StyledChip = styled(Chip)`
  font-family: Arial !important;
  font-size: 14px !important;
  height: 28px !important;
  color: ${props =>
    props.type === "delete"
        ? "#ff0000"
        : props.type === "info"
        ? "#4C84FF"
        : props.type === "success"
            ? "#2fd565"
            : ""} !important;
  border: ${props =>
    props.type === "delete"
        ? "0.5px solid #ff0000"
        : props.type === "info"
        ? "0.5px solid #4C84FF"
        : props.type === "success"
            ? "0.5px solid #2fd565"
            : ""} !important;
`;