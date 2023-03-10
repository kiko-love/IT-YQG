

// 将数组中的元素移动到数组的开头位置
const moveElementToFront = (arr, elem) => {
    // 找到重复元素在数组中的位置
    const index = arr.indexOf(elem);

    // 如果元素不在数组中，直接返回原数组
    if (index === -1) {
        return arr;
    }

    // 从数组中删除重复元素
    arr.splice(index, 1);

    // 将重复元素添加到数组的开头位置
    arr.unshift(elem);

    return arr;
}
export { moveElementToFront }
