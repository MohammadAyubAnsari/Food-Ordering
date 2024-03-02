// import { userCreateMyUser } from "@/api/MyUserAPI";
import { Auth0Provider, AppState, User, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

const AuthOProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to initialize auth");
  }

  const onRedirectCallback = async (appState?: AppState, user?: User) => {
    const token = await getAccessTokenSilently();
    console.log("token", token);
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
export default AuthOProviderWithNavigate;
