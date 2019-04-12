import React from "react";
import langConf from "../js/lang";
import styled from "styled-components";
import "../js/API";

const DivWrapper = styled.div`
  direction: ${props => props.direction};
  display: flex;
  justify-content: center;
`;

class SentInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    };
  }

  render() {
    const { lang, width } = this.props;
    const { loading } = this.state;
    return (
      <DivWrapper direction={langConf[lang].direction}>
      </DivWrapper>
    );
  }
}

export default SentInvoices;
