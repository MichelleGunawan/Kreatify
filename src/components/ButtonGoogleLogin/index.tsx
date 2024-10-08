"use client";
import React from "react";
import { createClient } from "@/utils/supabase/ssr/client";
import Icon from "@/components/Icon";
import { getIconLink } from "@/utils/functions/iconLinks";
import "./styles/index.scss";

const ButtonGoogleLogin = () => {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${
          // Check depending on userPermission whether to route to talent or management next
          "/home"
        }`,
      },
    });
  };

  return (
    <button
      className="h1 button-google-login"
      onClick={handleGoogleLogin}
      type="submit"
    >
      <Icon link={getIconLink("google")} />
      <div className="ml-2">Continue with Google</div>
    </button>
  );
};

export default ButtonGoogleLogin;
