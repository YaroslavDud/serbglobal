'use client'

import "./globals.css";
import store from './store'
import {Provider} from "react-redux";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <Provider store={store}>
          <body className={inter.className}>{children}</body>
        </Provider>
      </html>
  );
}
