//variable declaration
const bars_parent = document.querySelector("#bars");
const generate_arr = document.querySelector("#ar_btn");
const bubble = document.querySelector("#bubble_btn");
const insertion = document.querySelector("#insertion_btn");
const selection = document.querySelector("#selection_btn");
const quick = document.querySelector("#quick_btn");
const merge = document.querySelector("#merge_btn");
let spin = document.querySelector(".speed");
let speed = document.querySelector(".speed-slider");
let siin = document.querySelector(".size");
let size = document.querySelector(".size-slider");
let ar = [];
let ele_ar;
let current;
let sorting = true;
let p = "rebeccapurple";
let b = "black";
let y = "#fca311";
let g = "green";
let r = "red";
let back = "#fafec1";
let sort_speed = 250;
let n = 50;

//functions
function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, sort_speed);
    });
}
function changeColor(elem, col) {
    elem.style.background = col;
}
function flash(curEle, color) {
    return new Promise((resolve) => {
        setTimeout(function () {
            changeColor(curEle, color);
            resolve();
        }, 100);
    });
}
async function effect(elem, c1, c2) {
    let f = 2;
    while (f-- >= 0) {
        await flash(elem, c1);
        await flash(elem, c2);
    }
    return new Promise((resolve) => {
        resolve();
    });
}
function initialize() {
    bars_parent.innerHTML = "";
    const wd = (90 * n) / 100;
    bars_parent.style.width = `${wd}%`;
    ar = [];
    for (let i = 0; i < n; i++) {
        ar.push(Math.floor(2 + Math.random() * 99));
        const ele = document.createElement("div");
        ele.style.height = `${ar[i]}%`;
        ele.classList.add("bar");
        ele.id = `bar${i}`;
        ele.style.background = p;
        bars_parent.appendChild(ele);
    }
    ele_ar = document.querySelectorAll(".bar");
}
function disableButtons(button) {
    merge.disabled = true;
    quick.disabled = true;
    insertion.disabled = true;
    selection.disabled = true;
    bubble.disabled = true;
    generate_arr.disabled = true;
    siin.disabled = true;
    button.disabled = false;
    button.innerText = "End";
}
function enableButtons(button) {
    merge.disabled = false;
    quick.disabled = false;
    insertion.disabled = false;
    selection.disabled = false;
    bubble.disabled = false;
    generate_arr.disabled = false;
    siin.disabled = false;
    if (button == selection) current = "Selection Sort";
    else if (button == insertion) current = "Insertion Sort";
    else if (button == bubble) current = "Bubble Sort";
    else if (button == quick) current = "Quick Sort";
    else current = "Merge Sort";
    button.innerText = current;
}
function swap(e1, e2) {
    const temp = e1.style.height;
    e1.style.height = e2.style.height;
    e2.style.height = temp;
}
async function bubble_sort() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!sorting) return;
            const el1 = document.querySelector(`#bar${j}`);
            const el2 = document.querySelector(`#bar${j + 1}`);
            el2.style.background = r;
            if (ar[j] > ar[j + 1]) {
                temp = ar[j];
                ar[j] = ar[j + 1];
                ar[j + 1] = temp;
                swap(el1, el2);
            }
            await delay();
            el2.style.background = p;
        }
        let lastbar = document.querySelector(`#bar${n - i - 1}`);
        await effect(lastbar, r, g);
        lastbar.style.background = "green";
    }
}
async function insertion_sort() {
    let ele = bars_parent.children;
    await effect(ele[0], r, g);
    delay();
    for (let i = 1; i < n; i++) {
        if (!sorting) return;
        let j = i - 1,
            key = ar[i],
            keyH = ele[i].style.height;
        ele[i].style.background = r;
        await effect(ele[i], p, r);
        await delay();
        while (j >= 0 && ar[j] > key) {
            if (!sorting) return;
            ar[j + 1] = ar[j];
            ele[j + 1].style.height = ele[j].style.height;
            ele[j + 1].style.background = g;
            if (!sorting) return;
            ele[j].style.background = back;
            j--;
            if (!sorting) return;
            await delay();
        }
        ar[j + 1] = key;
        ele[j + 1].style.height = keyH;
        if (!sorting) return;
        ele[j + 1].style.background = r;
        await delay();
        if (!sorting) return;
        ele[j + 1].style.background = g;
        await delay();
    }
}
async function selection_sort() {
    for (let i = 0; i < n; i++) {
        const cur_idx = document.querySelector(`#bar${i}`);
        if (!sorting) return;
        cur_idx.style.background = r;
        let min_idx = i;
        let min_ele = document.querySelector(`#bar${min_idx}`);
        for (let j = i + 1; j < n; j++) {
            const el2 = document.querySelector(`#bar${j}`);
            el2.style.background = b;
            if (ar[j] < ar[min_idx]) {
                await delay();
                if (min_idx != i) min_ele.style.background = p;
                min_idx = j;
                min_ele = document.querySelector(`#bar${min_idx}`);
                if (!sorting) return;
                min_ele.style.background = y;
            }
            await delay();
            if (j != min_idx) el2.style.background = p;
            if (!sorting) return;
        }
        let temp = ar[min_idx];
        ar[min_idx] = ar[i];
        ar[i] = temp;
        await effect(min_ele, y, g);
        min_ele.style.background = p;
        swap(cur_idx, min_ele);
        await effect(cur_idx, y, g);
        cur_idx.style.background = g;
    }
}

//Main logic̥
initialize();
ele_ar = document.querySelectorAll(".bar");
generate_arr.addEventListener("click", initialize);
bubble.addEventListener("click", async () => {
    if (bubble.innerText == "End") {
        enableButtons(bubble);
        sorting = false;
        initialize();
        return;
    }
    sorting = true;
    disableButtons(bubble);
    await bubble_sort();
    enableButtons(bubble);
});
insertion.addEventListener("click", async () => {
    if (insertion.innerText == "End") {
        enableButtons(insertion);
        sorting = false;
        initialize();
        return;
    }
    sorting = true;
    disableButtons(insertion);
    await insertion_sort();
    enableButtons(insertion);
});
selection.addEventListener("click", async () => {
    if (selection.innerText == "End") {
        enableButtons(selection);
        sorting = false;
        initialize();
        return;
    }
    sorting = true;
    disableButtons(selection);
    await selection_sort();
    enableButtons(selection);
});
quick.addEventListener("click", async () => {
    if (quick.innerText == "End") {
        enableButtons(quick);
        sorting = false;
        initialize();
        return;
    }
    sorting = true;
    disableButtons(quick);
    for (let i = 0; i < n; i++) {
        ele_ar[i].style.background = "#b588e3";
    }
    await quick_sort(0, n - 1);
    if (!sorting) return;
    for (let i = 0; i < n; i++) {
        ele_ar[i].style.background = g;
    }
    enableButtons(quick);
});
merge.addEventListener("click", async () => {
    if (merge.innerText == "End") {
        enableButtons(merge);
        sorting = false;
        initialize();
        return;
    }
    sorting = true;
    disableButtons(merge);
    await merge_sort(0, n - 1);
    if (!sorting) return;
    for (let i = 0; i < n; i++) {
        ele_ar[i].style.background = g;
    }
    enableButtons(merge);
});
spin.addEventListener("input", () => {
    var target = speed.querySelector(".value");
    target.innerHTML = spin.value;
    sort_speed = 500 - spin.value * 50;
});
siin.addEventListener("input", () => {
    var target = size.querySelector(".value");
    target.innerHTML = siin.value;
    n = siin.value;
    bars_parent.innerHTML = "";
    initialize();
});
