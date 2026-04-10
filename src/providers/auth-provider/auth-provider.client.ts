"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

const API_URL = "https://quin-teriors.vercel.app/api/v1";

function readAuthCookie() {
  const auth = Cookies.get("auth");
  if (!auth) {
    return null;
  }

  try {
    return JSON.parse(auth) as {
      token: string;
      admin: { id: number; email: string; role: string };
    };
  } catch {
    return null;
  }
}

export const authProviderClient: AuthProvider = {
  login: async ({ email, password, remember }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        return {
          success: false,
          error: {
            name: "LoginError",
            message:
              body?.error || body?.message || "Invalid email or password",
          },
        };
      }

      const json = await response.json();
      const data = (json?.data ?? json) as {
        token: string;
        admin: { id: number; email: string; role: string };
      };

      Cookies.set("auth", JSON.stringify(data), {
        expires: remember ? 30 : 1,
        path: "/",
      });

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message:
            error instanceof Error
              ? error.message
              : "Unable to log in, please try again.",
        },
      };
    }
  },
  logout: async () => {
    const auth = readAuthCookie();

    if (auth?.token) {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      }).catch(() => null);
    }

    Cookies.remove("auth", { path: "/" });

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = readAuthCookie();
    if (auth?.token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = readAuthCookie();
    if (auth?.admin?.role) {
      return [auth.admin.role];
    }
    return null;
  },
  getIdentity: async () => {
    const auth = readAuthCookie();
    if (auth?.admin) {
      return auth.admin;
    }
    return null;
  },
  onError: async (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove("auth", { path: "/" });
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return { error };
  },
};
