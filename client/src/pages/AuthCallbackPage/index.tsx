import React from "react";
import { useSearchParams } from "react-router";

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      console.log(accessToken, refreshToken);
    }
  }, [searchParams]);

  return null;
}

export default AuthCallbackPage;
