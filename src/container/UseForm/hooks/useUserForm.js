import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTINGS } from "../../../constants/routingConstant";
import { useSocketConnection } from "../../../hook/SocketConnection/useSocketConnection";
import { APLHABET_REGEX } from "../../../constants/regex.constants";

export default function useUserForm() {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const { initializeSocketInstance } = useSocketConnection();
  const navigate = useNavigate();

  const handleChangeUserName = (value) => {
    if (APLHABET_REGEX?.test(value)) {
      setUserNameError(false);
    } else {
      setUserNameError(true);
    }
    setUserName(value);
  };

  const handleSubmitClick = () => {
    if (userName && !userNameError) {
      initializeSocketInstance({ username: userName });
      navigate(ROUTINGS.CHATVIEW);
    }
  };

  return {
    userName,
    userNameError,
    handleChangeUserName,
    handleSubmitClick,
  };
}
