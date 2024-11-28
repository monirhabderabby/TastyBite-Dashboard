"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgress = () => {
    return (
        <ProgressBar
            height="3px"
            color="#121619"
            options={{ showSpinner: false }}
        />
    );
};

export default NProgress;
