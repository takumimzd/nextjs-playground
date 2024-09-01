"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { pagesPath } from "@/utils/path/$path";

export const resetPassword = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      pagesPath.protected.reset_password.$url().pathname,
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      pagesPath.protected.reset_password.$url().pathname,
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      pagesPath.protected.reset_password.$url().pathname,
      "Password update failed",
    );
  }

  encodedRedirect("success", pagesPath.protected.reset_password.$url().pathname, "Password updated");
};