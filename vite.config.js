import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [vue()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
              @import "./src/app/styles/assets/index.scss";
            `,
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: fileURLToPath(new URL("./src", import.meta.url)),
                },
            ],
        },

        define: {
            "process.env.PROTOCOL": JSON.stringify(env.PROTOCOL),
            "process.env.DOMAIN": JSON.stringify(env.DOMAIN),
        },
    };
});
