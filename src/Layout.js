import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Gallery } from './Gallery';


export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
              <div className="main-wrapper">{this.props.children}</div>
        );
    }
}
