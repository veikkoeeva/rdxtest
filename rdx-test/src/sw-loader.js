//import { Workbox } from "workbox-window/Workbox.mjs";

async function workboxLoader()
{
    if("serviceWorker" in navigator)
    {
        const { Workbox } = import("workbox-window/Workbox.mjs");
        const wb = new Workbox("sw.js");
        wb.addEventListener("message", (event) =>
        {
            if(event.data.type === "CACHE_UPDATED")
            {
                const {updatedURL} = event.data.payload;      
                console.log(`A newer version of ${updatedURL} is available!`);
            }
        });
            
        wb.register();
    }
}