const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// ✅ Fix asset loading issue
config.resolver.assetExts.push("png");

module.exports = config;