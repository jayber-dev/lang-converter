const elem = document.querySelector("#hello")
console.log(elem)
elem.addEventListener('click', (e) => {
    console.log(e)
    elem.style.color = "red"
})