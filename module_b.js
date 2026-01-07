// module.js

/**
 * Main function to run when this file is executed directly
 */
function main() {
    console.log("Running main function...");
    // Your main logic here
}

// Export functions for when this file is imported
module.exports = { main };

// Check if this file is run directly
if (require.main === module) {
    try {
        main();
    } catch (err) {
        console.error("Error in main:", err);
        process.exit(1);
    }
}
