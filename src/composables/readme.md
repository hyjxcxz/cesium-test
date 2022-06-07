# 封装的组件文件
## 搜索框--search-component 
src/composables/search/search-component.vue
placeholder 和searchOptions为父组件传入信息
placeholder：搜索框提示信息
searchOptions：搜索框左侧下拉选择数组对象
    searchOptions=[{
        value: 'projectName',
        label: '项目名称'
        }, {
        value: 'projectNumber',
        label: '项目编号'
        }]
search-click-item 为点击搜索列表后传值：Object
##  搜索框查询结果列表--searchlist-component
src/composables/searchList/searchlist-component.vue
## 暂无数据组件
src/composables/nodata/nodata-component.vue
父组件传data(暂无数据提示信息)
