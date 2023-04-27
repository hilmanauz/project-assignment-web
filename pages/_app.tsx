import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import "@styles/global.css";
import "@styles/vars.css";
import store from "@datastore/app/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
