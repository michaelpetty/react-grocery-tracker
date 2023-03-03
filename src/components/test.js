import React, { Component } from "react";
import {
  Button,
  Divider,
  Image,
  Transition,
  Container
} from "semantic-ui-react";
import GrocerySearch from "./GrocerySearch";
import Receipts from "./Receipts";

let styleObj = {
  width: "300px",
  height: "200px",
  borderRadius: "16px",
  background: "#9b59b6"
};

export default class TransitionExampleThree extends Component {
  state = { visibl: false };

  toggleVisibility = () => this.setState({ visibl: !this.state.visibl });

  render() {
    const { visibl } = this.state;
    return (
      <div>
        <Button
          content={visibl ? "Hide" : "Show"}
          onClick={this.toggleVisibility}
        />
        <Divider hidden />
        <Transition
          visible={visibl}
          animation="fade"
          duration={1500}
          unmountOnHide={true}
        >
          <PackageComponent>Some package content goes here...</PackageComponent>
        </Transition>
        <Transition
          visible={visibl}
          animation="fade"
          duration={1500}
          unmountOnHide={true}
        >
          <div className="mp box" ><Receipts /></div>
        </Transition>
      </div>
    );
  }
}

class PackageComponent extends React.Component {
  render() {
    return (
      <Container {...this.props} style={{ ...styleObj, ...this.props.style }}>
        {this.props.children}
      </Container>
    );
  }
}