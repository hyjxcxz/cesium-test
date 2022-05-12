const scoutingLayer = {}

let kmlLayer = null
let infoBox = null
scoutingLayer.load = function(url) {
  scoutingLayer.remove()
  if (!url) {
    return
  }
  if (!kmlLayer) {
    kmlLayer = new WindEarth.KmlLayer(gwmap.viewer, {
      isRotateWithGlobe: true
    })
  }
  kmlLayer.loadData({
    url: url,
    clampToGround: true // 是否贴地
  })
  kmlLayer.addToViewer()

  !infoBox && (infoBox = document.createElement('div'))
  infoBox.id = 'kmlLayer'
  infoBox.style.display = 'none'
  document.body.appendChild(infoBox)
  kmlLayer.leftClickChanged.addEventListener(function(event) {
    infoBox.style.display = event.isShow ? 'block' : 'none'
    infoBox.innerHTML = event.info
    infoBox.style.top = event.winPos.y + 'px'
    infoBox.style.left = event.winPos.x + 'px'
    // console.log(event)
  })
  kmlLayer.infoPosChanged.addEventListener(function(event) {
    if (event.winPos && event.winPos.x && event.winPos.y) {
      infoBox.style.top = event.winPos.y + 'px'
      infoBox.style.left = event.winPos.x + 'px'
      infoBox.style.display = 'block'
    } else {
      infoBox.style.display = 'none'
    }
  })
}

scoutingLayer.zoomToLayer = function() {
  kmlLayer && kmlLayer.layerLocation()
}

scoutingLayer.remove = function() {
  kmlLayer && kmlLayer.removeFromViewer()
  infoBox && document.body.removeChild(infoBox)
  kmlLayer = null
  infoBox = null
}
export default scoutingLayer
