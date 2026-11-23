
function SignupHeader({ step }) {
  return (
    <>
      <div className="signup-heading">
        <h1>
          {step === 1 ? "Create an account" : "Your profile"}
        </h1>

        <p>
          {step === 1
            ? "Enter your details to get started."
            : "Complete your profile details."}
        </p>
      </div>

      <div className="signup-progress">
        <div className={step >= 1 ? "progress-active" : ""}></div>
        <div className={step >= 2 ? "progress-active" : ""}></div>
      </div>
    </>
  );
}

export default SignupHeader;
