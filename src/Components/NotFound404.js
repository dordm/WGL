import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDivSupplierNotFound = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 60px;
`;

function NotFound404(props) {
  return (
    <StyledDivSupplierNotFound>
      <div align="center">
        <img
          src={require("../images/error404.jpg")}
          alt={"404 not found"}
          height={props.width > 600 ? (props.width > 1500 ? 800 : 500) : 300}
          width={props.width > 600 ? (props.width > 1500 ? 800 : 500) : 300}
        />
      </div>
    </StyledDivSupplierNotFound>
  );
}

NotFound404.propTypes = {
  width: PropTypes.number.isRequired
};

export default NotFound404;
