import type { AuthProvider } from "@refinedev/core";
import { cookies } from "next/headers";

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async () => {
    const cookieStore = await cookies();

    const auth = cookieStore.get("auth");

    if (auth?.value) {
      try {
        const parsed = JSON.parse(auth.value) as {
          token?: string;
          admin?: { id?: number; email?: string; role?: string };
        };

        if (parsed?.token) {
          return {
            authenticated: true,
          };
        }
      } catch {
        // invalid cookie payload
      }
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
};
