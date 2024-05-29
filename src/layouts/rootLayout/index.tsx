import React from "react";
import { Outlet } from "react-router-dom";
import QueryProvider from "../../contexts/query-provider";
import Container from "../../components/container";
import styles from "./rootLayout.module.css";

const RootLayout = () => {
  return (
    <QueryProvider>
      <Container>
        <main className={styles.main}>
          <Outlet />
        </main>
      </Container>
    </QueryProvider>
  );
};

export default RootLayout;
