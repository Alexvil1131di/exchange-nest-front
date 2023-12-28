import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useUserAuth } from "@/hooks/auth/hooks";



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { userAuth } = useUserAuth(router.pathname)

  return (
    <>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <QueryClientProvider client={new QueryClient}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />

      </QueryClientProvider>

    </>
  );
}
