import json from '@rollup/plugin-json';
import vuePlugin from 'rollup-plugin-vue';
import { chromeExtension, simpleReloader, } from 'rollup-plugin-chrome-extension';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/manifest.json',
    output: {
        dir: 'dist',
        format: 'esm',
    },
    onwarn: (warning, defaultHandler) => {
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        defaultHandler(warning)
    },
    // watch: { clearScreen: false }, // for dev debug
    plugins: [
        // chromeExtension() must be first, in order to properly treat manifest.json as the entry point
        chromeExtension({
            extendManifest: {
                //"oauth2": {
                //  "client_id": process.env.VUE_APP_OAUTH2_CLIENT_ID,
                //  "scopes": [
                //    "https://www.googleapis.com/auth/userinfo.email",
                //    "https://www.googleapis.com/auth/userinfo.profile"
                //  ]
                //},
                // "key": ""
            }
        }),
        copy({
            targets: [
                {
                    src: 'src/index.html',
                    dest: 'dist'
                },
            ]
        }),
        replace({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            "process.env.NODE_ENV": JSON.stringify("production"),
            preventAssignment: true
        }),
        simpleReloader(), // Adds a Chrome extension reloader during watch mode
        vuePlugin({ target: 'browser' }),
        postcss(),
        json(),
        resolve(),
        commonjs(),
        image(),
    ],
};

