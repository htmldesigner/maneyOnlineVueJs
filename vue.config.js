module.exports = {
 devServer: {
  proxy: {
   '/api': {
    target: "https://expresszaim.kz",
    ws: true,
    changeOrigin: true
   },
  }
 },
}