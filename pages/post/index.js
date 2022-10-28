/* Desenvolva seu script aqui */
const buttonBackHome = document.querySelector(".btn-home")
const localStorageId = localStorage.getItem("currentId")
const loading = document.querySelector(".loading-wrapper")
const observer = new IntersectionObserver(entries => console.log(entries))
const localStorageCategory = localStorage.getItem("filterCategory")
const arrButtons = ["Todos", "Pintura", "Decoração", "Organização", "Limpeza", "Segurança", "Reforma", "Aromas"]

console.log(localStorageId)
console.log(localStorageCategory)

let newArr = []
async function recipePost(){
    const requisition = await fetch(`https://m2-api-living.herokuapp.com/news/${localStorageId}`)
    // .then(res => res.json())
    // .then((resJson) => resJson)

    const data = await requisition.json();
    
   createPost(data)
}

recipePost()

function createPost(post){
   
        let titlePost = document.querySelector(".titlePost")
        titlePost.innerText = ""
        titlePost.innerText = post.title;

        let description = document.querySelector(".descriptionPost")
        description.innerText = post.description;

        let imgPost = document.querySelector(".img-post")
        imgPost.src = post.image

        let tagP = document.querySelector(".tagP-text")
        tagP.innerText = post.content

}

function makeButtons(){
    let navArea = document.querySelector(".area-btn")
    arrButtons.forEach(element => {
        let buttons = document.createElement("button")
        buttons.classList.add("btn-nav")
        buttons.innerText = element;
        buttons.addEventListener("click", (event)=>{
            loading.classList.toggle("loading-show")
            setTimeout(() => {
                window.location.href = './../../index.html'
            }, 4000);
            localStorage.setItem("buttonClicker", element)
       
    })
    navArea.appendChild(buttons)
})
}

makeButtons()






buttonBackHome.addEventListener("click", (e)=>{
    loading.classList.toggle("loading-show")
    setTimeout(() => {
        window.location.href = './../../index.html'
    }, 4000);
})

const backToTop = document.querySelector(".btn-backTop")

backToTop.addEventListener("click", (e)=>{
    e.preventDefault();
    window.scrollTo(0, 0)
})
