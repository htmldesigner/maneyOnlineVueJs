module.exports = {
 devServer: {
  proxy: {
   '/api': {
    target: "https://expresszaim.kz",
    // target: "https://express-zaim.web-design.kz",
    ws: true,
    changeOrigin: true
   },
  }
 },
}