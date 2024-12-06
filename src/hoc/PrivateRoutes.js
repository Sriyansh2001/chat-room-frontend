import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { getUserNameFromLocalStorage } from "../service/localstorage/username.localstorage";
import { getMessageIdFromLocalStorage } from "../service/localstorage/messageId.localstorage";
import { ROUTINGS } from "../constants/routingConstant";

export default function PrivateRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUserNameFromLocalStorage() || !getMessageIdFromLocalStorage()) {
      navigate(ROUTINGS.FORM);
    }
    // eslint-disable-next-line
  }, []);

  if (!getUserNameFromLocalStorage() || !getMessageIdFromLocalStorage()) {
    return <>Please type username then try again</>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
