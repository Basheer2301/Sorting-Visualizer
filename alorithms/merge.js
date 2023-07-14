async function mrge(low, mid, high) {
    if (!sorting) return;
    let temp = new Array(high - low + 1);
    let i = low,
        j = mid + 1,
        k = 0;
    while (i <= mid && j <= high) {
        let num1 = parseInt(ele_ar[i].style.height);

        let num2 = parseInt(ele_ar[j].style.height);
        if (num1 < num2) {
            temp[k++] = num1;
            i++;
        } else {
            temp[k++] = num2;
            j++;
        }
    }
    while (i <= mid) {
        let num1 = parseInt(ele_ar[i].style.height);
        temp[k++] = num1;
        i++;
    }
    while (j <= high) {
        let num2 = parseInt(ele_ar[j].style.height);
        temp[k++] = num2;
        j++;
    }
    for (let i = low; i <= high; i++) {
        ele_ar[i].style.background = b;
        await delay();
        ele_ar[i].style.height = `${temp[i - low]}%`;
        if (!sorting) return;
        ele_ar[i].style.background = y;
    }
}
async function merge_sort(low, high) {
    if (low < high) {
        let mid = Math.floor((high + low) / 2);
        if (!sorting) return;
        await merge_sort(low, mid);
        if (!sorting) return;
        await merge_sort(mid + 1, high);
        if (!sorting) return;
        await mrge(low, mid, high);
        if (!sorting) return;
    }
}
