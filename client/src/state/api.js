// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log(import.meta.env.VITE_REACT_APP_BASE_URL);

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  }),
  reducerPath: "intensityApi",
  tagTypes: ["Intensity"],
  endpoints: (build) => ({
    getIntensity: build.query({
      query: () => `dashboard`,
      providesTags: [
        "Intensity",
        "Likelihood",
        "Country",
        "Topics",
        "dashboard",
      ],
    }),
    postLikelihood: build.mutation({
      query: (data) => ({
        url: `/likelihood`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Likelihood"],
    }),
    getLikelihood: build.query({
      query: () => "likelihood",
      method: "GET",
      providesTags: ["Likelihood"],
    }),
    getCountry: build.query({
      query: () => "country",
      method: "GET",
      providesTags: ["Country"],
    }),
    getTopics: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "topics",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Topics"],
    }),
    getPieChartData: build.query({
      query: ({ endYear }) => ({
        url: "year",
        method: "GET",
        params: { endYear },
      }),
      providesTags: ["year"],
    }),
    getDashboardData: build.query({
      query: () => ({
        url: "dashboard",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useGetIntensityQuery,
  usePostLikelihoodMutation,
  useGetLikelihoodQuery,
  useGetCountryQuery,
  useGetTopicsQuery,
  useGetPieChartDataQuery,
  useGetDashboardDataQuery,
} = api;
