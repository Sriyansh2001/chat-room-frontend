import React from "react";
import styles from "./UserForm.module.css";
import useUserForm from "./hooks/useUserForm";
import { Button, TextField } from "@mui/material";

export default function UserForm() {
  const { userName, userNameError, handleChangeUserName, handleSubmitClick } =
    useUserForm();

  return (
    <div className={styles?.container}>
      <div className={styles.formContainer}>
        <div className={styles.boxContainer}>
          <span className={styles.textContent}>
            Please enter username and experience smooth chat experience
          </span>
          <TextField
            label="Username"
            value={userName}
            onChange={(e) => handleChangeUserName(e?.target?.value)}
            error={userNameError}
            helperText={userNameError && "Username only contain alphabets"}
          />
          <Button onClick={handleSubmitClick} className={styles.submitButton}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
