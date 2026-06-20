import { AuthBanner } from "../components/AuthBanner";
import { AuthCredentials } from "../components/AuthCredentials";

const Auth = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <AuthBanner />
      </div>
      <div style={{ flex: 1 }}>
        <AuthCredentials />
      </div>
    </div>
  );
};

export default Auth;
