module.exports = {
 devServer: {
  proxy: {
   '/api': {
    target: "https://express-zaim.web-design.kz",
    ws: true,
    changeOrigin: true
   },
  }
 },
}