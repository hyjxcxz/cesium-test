
const astrictLayer = {}

let astrictLayerFeature = [] // 存三维feature，解决内存不够的问题,不存item
astrictLayer.load = function(data) {
    astrictLayer.remove(data)
    let obj = {}
    let ids = Math.floor((Math.random() * 10000) + 1)
    obj.kmlLayer = new WindEarth.KmlLayer(gwmap.viewer)
    obj.id = ids
    data.id = ids
    astrictLayerFeature.push(obj)

    astrictLayer.addlayer(data)
}
astrictLayer.addlayer = function(data) {
    if (data.url && data.checked) {
        let modelFeature = astrictLayerFeature.filter((item, index) => {
            return item.id == data.id
        })
        // console.log(modelFeature)
        if (modelFeature.length > 0) {
            modelFeature[0].kmlLayer.loadData({
                url: data.url,
                clampToGround: true
            })
            modelFeature[0].kmlLayer.addToViewer()
            modelFeature[0].kmlLayer.layerLocation()
        }
    }
    // console.log(astrictLayerFeature)
}

astrictLayer.remove = function(data, type = false) {
    let removeFeature = null
    let removeIndex = null
    astrictLayerFeature.forEach((item, index) => {
        if (item.id == data.id) {
            removeFeature = item
            removeIndex = index
        }
    })
    if (removeFeature) {
        removeFeature.kmlLayer.removeFromViewer()
        data.id = null
        astrictLayerFeature.splice(removeIndex, 1)
    }
    // console.log(astrictLayerFeature)
}

astrictLayer.removeAll = () => {
    astrictLayerFeature.forEach((item, index) => {
        item.kmlLayer.removeFromViewer()
    })
    astrictLayerFeature = []
}
export default astrictLayer
