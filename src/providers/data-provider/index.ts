"use client";

import dataProviderSimpleRest, { axiosInstance } from "@refinedev/simple-rest";
import Cookies from "js-cookie";
import type {
    CrudFilter,
    GetListParams,
    GetOneParams,
    GetListResponse,
    GetOneResponse,
    LogicalFilter,
} from "@refinedev/core";

// 1. Get the base domain and provide a safe fallback for local development
const BASE_DOMAIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 2. Safely combine them using a clean URL formatting check
const API_URL = `${BASE_DOMAIN.replace(/\/$/, "")}/api/v1`;

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

const isLogicalFilter = (filter: CrudFilter): filter is LogicalFilter => {
    return "field" in filter;
};

const getFilterValue = (filters: CrudFilter[] | undefined, field: string) => {
    const filter = filters?.find((item) => {
        return isLogicalFilter(item) && item.field === field;
    });

    if (!filter || !isLogicalFilter(filter)) {
        return undefined;
    }

    const value = Array.isArray(filter.value) ? filter.value[0] : filter.value;

    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
    }

    return value ?? undefined;
};

const buildLeadListParams = ({
    page,
    limit,
    filters,
    sorters,
}: {
    page: number;
    limit: number;
    filters?: CrudFilter[];
    sorters?: GetListParams["sorters"];
}) => {
    const sorter = sorters?.[0];
    const status = getFilterValue(filters, "status");
    const search = getFilterValue(filters, "search");

    return {
        page,
        limit,
        sortField: sorter?.field,
        sortOrder: sorter?.order?.toUpperCase(),
        status,
        search,
    };
};

// ✅ OVERRIDE ONLY WHAT IS BROKEN
export const dataProvider = {
    ...baseProvider,

    getList: async (params: GetListParams): Promise<GetListResponse<any>> => {

        const { resource, pagination, filters, sorters } = params;
        const page = pagination?.currentPage || 1;
        const limit = pagination?.pageSize || 10;

        // alert(`GET LIST RESOURCE = ${resource}`);
        if (resource === "leads-trash") {
            const res = await authHttpClient.get(
                `${API_URL}/leads/trash`, {
                params: buildLeadListParams({
                    page,
                    limit,
                    filters,
                    sorters,
                }),
            });

            return {
                data: res.data.data.items,  // 👈 FIX HERE
                total: res.data.data.total,  // 👈 FIX HERE
            };
        }

        if (resource === "leads") {
            const res = await authHttpClient.get(`${API_URL}/leads`, {
                params: buildLeadListParams({
                    page,
                    limit,
                    filters,
                    sorters,
                }),
            });

            return {
                data: res.data.data.items,
                total: res.data.data.total,
            };
        }

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

    getOne: async (params: GetOneParams): Promise<GetOneResponse<any>> => {
        const { resource, id } = params;
        const res = await authHttpClient.get(`${API_URL}/${resource}/${id}`);

        return {
            data: res.data.data || res.data, // 👈 depending on your successResponse
        };
    },

    restoreLead: async (id: number) => {
        const res = await authHttpClient.patch(
            `${API_URL}/leads/${id}/restore`
        );

        return {
            data: res.data.data,
        };
    },

};
