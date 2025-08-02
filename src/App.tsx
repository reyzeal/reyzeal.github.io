import { Router } from '@solidjs/router';
import routes from '~solid-pages'
import {createEffect, Suspense} from "solid-js";
import {MetaProvider} from "@solidjs/meta";

export default function App() {
    createEffect(() => {
        console.log('App is running', routes);
    })
    return (
        <MetaProvider>
            <Router root={props => <Suspense>
                {props.children}
            </Suspense>}>
                {routes}
            </Router>
        </MetaProvider>
    );
}