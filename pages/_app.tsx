import "./cssreset.css";

import React from "react";
import App, { Container } from "next/app";
// @ts-ignore
import Modal from "react-modal";
import { ApolloProvider } from "react-apollo-hooks";
import withApolloClient from "../lib/with-apollo-client";
import "../static/css/base.css";
import "../static/css/twitter-edge-icons.css";

Modal.setAppElement("#__next");

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
