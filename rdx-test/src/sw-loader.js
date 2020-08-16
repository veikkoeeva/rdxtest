export default async function workboxLoader()
{
    if("serviceWorker" in navigator)
    {
        const { Workbox } = await import("workbox-window/Workbox.mjs");
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

//export default (async () => { try { await workboxLoader() } catch(err) { console.error('Horrors of errors...')  } })();