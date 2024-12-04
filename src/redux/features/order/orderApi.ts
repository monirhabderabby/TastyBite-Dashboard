// @ts-nocheck

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
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { body, id } = arg;

                // optimistic cache update
                const result = dispatch(
                    baseApi.util.updateQueryData(
                        "getAllOrders",
                        {},
                        (draft) => {
                            const arrayOfOrders = draft.data;

                            const targetOrder = arrayOfOrders.find(
                                (order) => order._id == id
                            );
                            targetOrder.orderStatus = body.status;
                        }
                    )
                );

                try {
                    const res = await queryFulfilled;
                    if (!res.data?.success) {
                        result.undo();
                    }
                } catch {
                    result.undo();
                }
            },
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useGetSingleOrderQuery,
    useUpdateOrderStatusMutation,
} = orderApi;
