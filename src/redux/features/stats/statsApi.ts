import { baseApi } from "@/redux/api/baseApi";

const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStats: builder.query({
            query: () => "/stats/all-stats",
            providesTags: ["Order", "Stuff", "User", "Blog", "food"],
        }),
    }),
});
export const { useGetAllStatsQuery } = statsApi;
