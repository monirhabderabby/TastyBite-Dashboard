import { baseApi } from "../../api/baseApi";

const stuffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStuffs: builder.query({
            query: () => ({
                url: "/staff",
                method: "GET",
            }),
            providesTags: ["Stuff"],
        }),
        getSingleStuff: builder.query({
            query: (id) => ({
                url: `/staff/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "SingleStuff", id }],
        }),
        createStuff: builder.mutation({
            query: (body) => ({
                url: "/staff",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Stuff"],
        }),
        updateStuff: builder.mutation({
            query: ({ body, id }) => ({
                url: `/staff/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Stuff",
                { type: "SingleStuff", id },
            ],
        }),
        deleteStuff: builder.mutation({
            query: (id: string) => ({
                url: `/staff/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "Stuff",
                { type: "SingleStuff", id },
            ],
        }),
    }),
});

export const {
    useGetAllStuffsQuery,
    useGetSingleStuffQuery,
    useCreateStuffMutation,
    useUpdateStuffMutation,
    useDeleteStuffMutation,
} = stuffApi;
