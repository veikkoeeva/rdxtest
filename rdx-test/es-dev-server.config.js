const replace = require("@rollup/plugin-replace");

module.exports = {
  port: 8080,
  watch: true,
  nodeResolve: true,
  dedupe: true,
  open: true,
  extensions: ['.mjs', '.js'],
  moduleDirs: ['node_modules'],
  plugins: [
  {
    async transform(context)
    {
      if(context.path.endsWith("Workbox.js"))
      {        
        const transformedBody = context.body.replace(/process.env.NODE_ENV/gi, "'production'");        
        return { body: transformedBody };
      }

      if(context.path.endsWith("logger.js"))
      {
        const transformedBody = context.body.replace(/process.env.NODE_ENV/gi, "'production'");
        return { body: transformedBody };
      }
    }
  }],
  middlewares: [
    function rewriteRules(context, next)
    {            
      if(process.env.NODE_ENV === "development")
      {        
        if(context.url === "/" || context.url === "/index.html")
        {
          console.log(`In development mode, rewriting base path to index.html (and service worker files) in ${__filename}.`);
          context.url = "/src/index.html";
        }

        if(context.path.endsWith("manifest.json"))
        {
          context.url = "/src/manifest.json";
        }

        if(context.path.endsWith("sw-loader.js"))
        {
          context.url = "/src/sw-loader.js";
        }

        if(context.path.endsWith("/sw.js"))
        {
          context.url = "/src/sw.js";
        }
      }

      return next();
    }
  ]
};
