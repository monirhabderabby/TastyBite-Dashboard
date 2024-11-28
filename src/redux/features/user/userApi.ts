import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "SingleUser", id }],
        }),
        createUser: builder.mutation({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: ({ body, id }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "User",
                { type: "SingleUser", id },
            ],
        }),
        updateUserRole: builder.mutation({
            query: ({ body, id }) => ({
                url: `/users/update-role/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [
                "User",
                { type: "SingleUser", id },
            ],
        }),
        deleteUser: builder.mutation({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                "User",
                { type: "SingleUser", id },
            ],
        }),
        getAllDeliveryMan: builder.query({
            query: () => ({
                url: "/users?role=delivery man",
                method: "GET",
            }),
            providesTags: ["User"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,
    useGetAllDeliveryManQuery,
} = userApi;

export default userApi;
