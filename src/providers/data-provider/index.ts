"use client";

import dataProviderSimpleRest, { axiosInstance } from "@refinedev/simple-rest";
import Cookies from "js-cookie";

const API_URL = "https://biz.nextechsphere.world/api/v1";

const authHttpClient = axiosInstance;

authHttpClient.interceptors.request.use((config) => {
    const auth = Cookies.get("auth");

    if (auth) {
        try {
            const parsed = JSON.parse(auth) as { token?: string };
            if (parsed?.token) {
                if (!config.headers) {
                    config.headers = {} as any;
                }

                if (typeof (config.headers as any).set === "function") {
                    (config.headers as any).set("Authorization", `Bearer ${parsed.token}`);
                } else {
                    (config.headers as Record<string, string>)["Authorization"] =
                        `Bearer ${parsed.token}`;
                }
            }
        } catch {
            // ignore invalid auth cookie
        }
    }

    return config;
});

export const dataProvider = dataProviderSimpleRest(API_URL, authHttpClient);
