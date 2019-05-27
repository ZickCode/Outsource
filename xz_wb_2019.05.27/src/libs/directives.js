const focus = () => {
    return {
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        }
    }
}

export { focus}