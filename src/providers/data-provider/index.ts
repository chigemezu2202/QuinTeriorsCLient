"use client";

import dataProviderSimpleRest, { axiosInstance } from "@refinedev/simple-rest";
import Cookies from "js-cookie";
import type {
    GetListParams,
    GetOneParams,
    GetListResponse,
    GetOneResponse,
} from "@refinedev/core";

const API_URL = "http://localhost:8000/api/v1";

const authHttpClient = axiosInstance;

// ✅ AUTH INTERCEPTOR
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

// ✅ BASE PROVIDER
const baseProvider = dataProviderSimpleRest(API_URL, authHttpClient);

// ✅ OVERRIDE ONLY WHAT IS BROKEN
export const dataProvider = {
    ...baseProvider,

    getList: async (params: GetListParams) : Promise<GetListResponse<any>> => {
       const  { resource, pagination, filters, sorters } = params;
        const page = pagination?.currentPage || 1;
        const limit = pagination?.pageSize || 10;

        const res = await authHttpClient.get(`${API_URL}/${resource}`, {
            params: {
                page,
                limit,
            },
        });

        return {
            data: res.data.data.items,   // 👈 FIX HERE
            total: res.data.data.total,  // 👈 FIX HERE
        };
    },

    getOne: async (params: GetOneParams) : Promise<GetOneResponse<any>> => {
        const { resource, id } = params;
        const res = await authHttpClient.get(`${API_URL}/${resource}/${id}`);

        return {
            data: res.data.data || res.data, // 👈 depending on your successResponse
        };
    },
};