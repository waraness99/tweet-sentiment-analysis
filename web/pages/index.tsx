import React, { useEffect } from "react";
import type { NextPage } from "next";

import { Center } from "@chakra-ui/react";
import { Wizard } from "@/components/wizard";

import axios from "axios";
import { setCookie } from "cookies-next";

const Home: NextPage = () => {
  const getBearerToken = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8000/token",
    });

    return data.access_token;
  };

  const storeBearerToken = async () => {
    const token = await getBearerToken();
    setCookie("bearer_token", token);
  };

  useEffect(() => {
    storeBearerToken();
  }, []);

  return (
    <>
      <Center minH="100vh" p="4">
        <Wizard />
      </Center>
    </>
  );
};

export default Home;
