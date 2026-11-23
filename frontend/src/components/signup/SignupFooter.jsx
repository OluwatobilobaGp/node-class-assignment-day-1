
import { Link } from "react-router-dom";

function SignupFooter() {
  return (
    <div className="signup-login">
      Already have an account? <Link to="/login">Log in</Link>
    </div>
  );
}

export default SignupFooter;
