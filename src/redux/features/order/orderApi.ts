import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => "/order",
            providesTags: ["Order"],
        }),
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/order/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "SingleOrder", id }],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ body, id }) => ({
                url: `/order/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "Order",
                { type: "SingleOrder", id },
            ],
        }),
    }),
});
export const {
    useGetAllOrdersQuery,
    useGetSingleOrderQuery,
    useUpdateOrderStatusMutation,
} = orderApi;
