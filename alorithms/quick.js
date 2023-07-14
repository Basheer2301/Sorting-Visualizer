async function partition(low, high) {
    if (!sorting) return;
    let i = low - 1;
    let pivot = parseInt(ele_ar[high].style.height);
    ele_ar[high].style.background = y;
    await delay();
    for (let j = low; j < high; j++) {
        if (!sorting) return;
        ele_ar[j].style.background = b;
        await delay();
        if (parseInt(ele_ar[j].style.height) < pivot) {
            i++;
            swap(ele_ar[i], ele_ar[j]);
            if (!sorting) return;
            ele_ar[i].style.background = r;
            await delay();
        }
        if (i != j) ele_ar[j].style.background = p;
    }
    ele_ar[high].style.background = p;
    swap(ele_ar[i + 1], ele_ar[high]);
    return i + 1;
}

async function quick_sort(low, high) {
    if (!sorting) return;
    for (let i = low; i <= high; i++) {
        ele_ar[i].style.background = p;
    }
    if (low <= high) {
        if (!sorting) return;
        let ptn;
        if (low == high) ptn = low;
        else ptn = await partition(low, high);
        if (ele_ar[ptn] == null) return;
        if (ele_ar[ptn].style.background != g) {
            await effect(ele_ar[ptn], y, g);
            if (!sorting) return;
            ele_ar[ptn].style.background = g;
        }
        if (!sorting) return;
        for (let i = low; i <= high; i++) {
            if (ele_ar[i].style.background == g) {
                ele_ar[i].style.background = "#4ac94a";
            } else {
                ele_ar[i].style.background = "#b588e3";
            }
        }

        await quick_sort(low, ptn - 1);

        await quick_sort(ptn + 1, high);
    }
}
