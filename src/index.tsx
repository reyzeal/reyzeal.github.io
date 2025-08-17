/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App.tsx'
// @ts-ignore
import "./index.css";
import {QueryClient, QueryClientProvider} from "@tanstack/solid-query";
const queryClient = new QueryClient();
const root = document.getElementById('root')

render(() => <QueryClientProvider client={queryClient}>
    <App />
</QueryClientProvider>, root!)
