"use client";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Provider>
    );
};

export default AppProvider;
