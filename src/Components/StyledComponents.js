import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import DownloadIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

export const StyledDivBtns = styled.div`
  margin-top: 30px;
  display: flex;
  margin-bottom: 10px;
`;

export const ButtonCancel = styled(Button)`
  justify-self: left;
  height: 36px;
  width: 91px;
  text-transform: none !important;
  border-radius: 100px !important;
`;

export const StyledTxtFld = styled(TextField)`
  margin-top: 16px !important;
  width: ${props => (props.width > 600 ? "394px" : "235px")};
  height: 56px;
`;

export const StyledDialogContent = styled(DialogContent)`
  display: block;
  width: ${props => (props.width > 600 ? "445px" : "285px")};
  text-align: ${props =>
    props.direction === "rtl" ? "right" : "left"} !important;
`;

export const TypoLastInvoice = styled(Typography)`
  text-align: center;
  margin-top: 8px !important;
  margin-bottom: -8px !important;
  font-family: Arial !important;
  font-weight: bold !important;
  font-size: 14px !important;
`;

export const ShowIcon = styled(Visibility)`
  color: #4c84ff !important;
  height: 20px !important;
  width: 20px !important;
  margin-left: ${props =>
    props.direction === "rtl" ? "-8px" : "4px"} !important;
  margin-right: ${props =>
    props.direction === "rtl" ? "4px" : "-8px"} !important;
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: ${props => (props.direction === "rtl" ? "" : "15px")} !important;
  right: ${props => (props.direction === "rtl" ? "10px" : "")} !important;
  top: 5px;
`;

export const StyledCloseIcon = styled(IconButton)`
  position: absolute !important;
  right: 20px;
  top: 5px;
`;

export const StyledSupplier = styled.div`
  background: white;
  margin-bottom: 16px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

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

export const ListSuppliers = styled(List)`
  width: 50%;
  @media (max-width: 1650px) and (min-width: 1050px) {
    width: 60%;
  }
  @media (max-width: 1050px) and (min-width: 600px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledDownloadIcon = styled(DownloadIcon)`
  fill: #4c84ff !important;
  cursor: pointer;
`;

export const StyledEditIcon = styled(EditIcon)`
  fill: #4c84ff !important;
  cursor: pointer;
`;

export const DivWrapper = styled.div`
  direction: ${props => props.direction};
  display: flex;
  justify-content: center;
`;

export const StyledSelect = styled.select`
  direction: ${props => props.direction};
  padding-right: ${props => (props.direction === "rtl" ? "7" : "0")}px;
  margin-top: 2px;
  border: 1px solid #e4e8ed;
  box-sizing: border-box;
  height: 36px;
  background: #ffffff;
  width: 110px;
  padding-left: ${props => (props.direction === "ltr" ? "7" : "0")}px;
  border-radius: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
