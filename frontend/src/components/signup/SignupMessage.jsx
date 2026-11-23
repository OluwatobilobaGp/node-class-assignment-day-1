
function SignupMessage({ error, success }) {
  return (
    <>
      {error && (
        <p className="signup-error">
          {error}
        </p>
      )}

      {success && (
        <p className="signup-success">
          {success}
        </p>
      )}
    </>
  );
}

export default SignupMessage;
