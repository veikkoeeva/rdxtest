const ncu = require("npm-check-updates");
const packageFiles =
[
  "package.json"
];

packageFiles.map(async packageFile =>
{
    await ncu.run({ upgrade: true, packageFile });
    console.log(`Updated ${packageFile}`);
});
