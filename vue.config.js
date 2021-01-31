module.exports = {
 devServer: {
  proxy: {
   '/system/api': {
    target: "http://express-zaim.web-design.kz",
    ws: true,
    changeOrigin: true
   },
  }
 },
}