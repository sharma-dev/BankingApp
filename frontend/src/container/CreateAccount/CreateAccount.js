import React from "react";
import BankForm from "../../forms/BankForm";
import Card from "../../components/Card/Card";
import UserContext from "../../features/Context";
import RenderContent from "../../components/Content/RenderContent";

export default function CreateAccount(props) {
  const ctx = React.useContext(UserContext);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  function handleSubmit(name, email, password) {
    let index = ctx.users.findIndex((el) => el.email === email);
    if (index === -1) {
      // ctx.users.push({ name, email, password, balance: 0 });
      props.createUser({ name, email, password, balance: 0 });
      setSuccess(true);
    } else setError({ authError: "user with this email already exists!" });
  }

  function clearForm() {
    setSuccess(false);
  }

  return (
    <div className="create-account container">
      <div className="row">
        <div className="col-sm-8">
          <Card
            bgcolor="warning"
            header="Create Account"
            hideCurrentUser={true}
          >
            {success ? (
              <>
                <h5>Success</h5>
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={clearForm}
                >
                  Create Another Account
                </button>
              </>
            ) : (
              <BankForm onSubmit={handleSubmit} />
            )}
          </Card>
        </div>
        <div className="col-sm-4">
        <RenderContent instruction_type="Create"/>
        </div>
      </div>
    </div>
  );
}
