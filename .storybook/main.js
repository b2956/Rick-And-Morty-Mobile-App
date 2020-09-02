module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../storybook/stories/**/**/*.stories.tsx",
    "../storybook/stories/**/**/*.js",
    "../storybook/stories/*.js"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}