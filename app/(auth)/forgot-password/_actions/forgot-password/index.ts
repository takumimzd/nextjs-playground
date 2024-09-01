"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { pagesPath } from "@/utils/path/$path";

export const forgotPassword = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email) {
    return encodedRedirect("error", pagesPath.forgot_password.$url().pathname, "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      pagesPath.forgot_password.$url().pathname,
      "Could not reset password",
    );
  }
}