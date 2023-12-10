import "../css/login.css";
import React from "react";

import AuthForm from "../component/AuthForm";

function LoginPage() {
  return (
    <React.Fragment>
      <div>
        <AuthForm />
      </div>
    </React.Fragment>
  );
}
export default LoginPage;
