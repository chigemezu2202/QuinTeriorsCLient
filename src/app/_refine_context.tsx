"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import "./globals.css";
import { Toaster } from "@/components/refine-ui/notification/toaster";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { dataProvider } from "@providers/data-provider";

type RefineContextProps = {
  children: React.ReactNode;
};

export const RefineContext = ({ children }: RefineContextProps) => {
  const notificationProvider = useNotificationProvider();

  return (
    <RefineKbarProvider>
      <ThemeProvider>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={notificationProvider}
          authProvider={authProviderClient}
          routerProvider={routerProvider}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              meta: {
                canDelete: false,
                canEdit: false,
                canShow: false,
                canCreate: false,
                label: "Dashboard",
              },
            },
            {
              name: "settings",
              list: "/settings",
              create: "/settings/create",
              edit: "/settings/edit/:id",
              show: "/settings/show/:id",
              meta: {
                canDelete: false,
                label: "Settings",
              },
            },
            {
              name: "leads",
              list: "/leads",
              create: "/leads/create",
              edit: "/leads/edit/:id",
              show: "/leads/show/:id",
              meta: {
                label: "Leads",
              },
            },
            {
              name: "services",
              list: "/services",
              create: "/services/create",
              edit: "/services/edit/:id",
              show: "/services/show/:id",
              meta: {
                label: "Services",
              },
            },
            {
              name: "service-items",
              list: "/service-items",
              create: "/service-items/create",
              edit: "/service-items/edit/:id",
              show: "/service-items/show/:id",
              meta: {
                label: "Service Items",
              },
            },
            {
              name: "uploads",
              list: "/uploads",
              create: "/uploads/create",
              edit: "/uploads/edit/:id",
              show: "/uploads/show/:id",
              meta: {
                label: "Uploads",
              },
            },
            {
              name: "admins",
              list: "/admins",
              create: "/admins/create",
              edit: "/admins/edit/:id",
              show: "/admins/show/:id",
              meta: {
                label: "Admins",
              },
            },
            {
              name: "pages",
              list: "/pages",
              create: "/pages/create",
              edit: "/pages/edit/:id",
              show: "/pages/show/:id",
              meta: {
                label: "Pages",
              },
            },
            {
              name: "testimonials",
              list: "/testimonials",
              create: "/testimonials/create",
              edit: "/testimonials/edit/:id",
              show: "/testimonials/show/:id",
              meta: {
                label: "Testimonials",
              },
            },
            {
              name: "gallery",
              list: "/gallery",
              create: "/gallery/create",
              edit: "/gallery/edit/:id",
              show: "/gallery/show/:id",
              meta: {
                label: "Gallery",
              },
            },
            {
              name: "portfolio",
              list: "/portfolio",
              create: "/portfolio/create",
              edit: "/portfolio/edit/:id",
              show: "/portfolio/show/:id",
              meta: {
                label: "Portfolio",
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {children}
          <Toaster />
          <RefineKbar />
        </Refine>
      </ThemeProvider>
    </RefineKbarProvider>
  );
};
