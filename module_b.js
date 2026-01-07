// module.js
/* package.json
{
  "name": "web",
  "private": true,
  "type": "commonjs",
  "scripts": { },
  "description": "Web",
  "author": {"name": "pi" },
  "dependencies": { }
}
*/
/**
 * Main function to run when this file is executed directly
 */
function main() {
    console.log("Running main function...");
    // Your main logic here
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Export functions for when this file is imported
module.exports = { main,sleep };

// Check if this file is run directly
if (require.main === module) {
   (async function () {
    try {
        main();
    } catch (err) {
        console.error("Error in main:", err);
        process.exit(1);
    }
    console.time("abc")
    await sleep(1000)
    console.timeEnd("abc")
  })();
}
