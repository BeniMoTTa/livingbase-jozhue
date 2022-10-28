/* Desenvolva seu script aqui */
const tagUL = document.querySelector(".list-posts")
const tagFooter = document.querySelector(".footer-area");
let divLoading = document.querySelector(".loading-wrapper")
console.log(tagFooter)
let newArr = [];
let arrCategories = [];
let arrIdd = [];
async function createPost(post){
 
    post.forEach(element => {
        
        let tagLi = document.createElement("li")
        tagLi.classList.add("post")
        tagLi.id = element.id
        tagLi.setAttribute = ("data", element.category)
        
        arrCategories.push(element.category)
  
        localStorage.setItem("filterCategory", arrCategories)
        
        // newArr.push(element)
        let img = document.createElement("img")
        img.classList.add("img-post")
        img.id = "image"
        img.src = element.image

        let areaTextPost = document.createElement("div")
        areaTextPost.classList.add("text-post")

        let titlePost = document.createElement("h4")
        titlePost.innerText = element.title

        let textPost = document.createElement("p")
        textPost.innerText = element.description
    
        let anchor = document.createElement("button")
        anchor.classList.add("green-button-post")
        anchor.innerText = "Acessar conteúdo"
    
        anchor.addEventListener("click", (e)=>{
            divLoading.classList.toggle("loading-show")
            setTimeout(() => {
                window.location.href = './pages/post/index.html'
            }, 4000);
            localStorage.setItem("currentId", element.id)
        })
        
        
        areaTextPost.append(titlePost, textPost, anchor)
        tagLi.append(img, areaTextPost)
        tagUL.appendChild(tagLi)
    })
}

let localCategory = localStorage.getItem("filterCategory")
const arrButtons = ["Todos", "Pintura", "Decoração", "Organização", "Limpeza", "Segurança", "Reforma", "Aromas"]




    // const filterDirect = newArr.filter(filter => {
      
    //         if(event.target.innerText == filter.category){
              
    //           tagUL.innerHTML=""
    //           return filter
    //         }
    //         else if (event.target.innerText == "Todos"){
    //           tagUL.innerHTML=""

    //         }
            
    //       })
    //       createPost(filterDirect)
    // })

    // 





  function changeButton(button){
    button.classList.toggle("btn-change")
  }
    
const backToTop = document.querySelector(".btn-backTop")





backToTop.addEventListener("click", (e)=>{
    e.preventDefault();
    window.scrollTo(0, 0)
})






let page = 0;

async function observerFunc(currentPage) {

  let currentAPI = await fetch(`https://m2-api-living.herokuapp.com/news?page=${currentPage}`)
    .then((response) => response.json())
    .then((responseJson) => responseJson);
    
  return currentAPI.news;
}

const observer = new IntersectionObserver(async (entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
   const response = await observerFunc(page);

   if(response.length> 0 ){
    createPost(response)
      page++
   }
  }


});
async function responseAPI(){


observer.observe(tagFooter);
const response = await observerFunc(page);


}
responseAPI()
const localStorageBtnChecked = localStorage.getItem("buttonClicker")
console.log(localStorageBtnChecked)
async function buttonsNav(){
 
  const found = await observerFunc()
  let botaozinho = document.querySelectorAll(".btn-nav")
  botaozinho.forEach(element => {
    
      element.addEventListener("click", (event)=>{
         const filter = found.filter(element =>{
          if(event.target.innerText == "Todos"){
            return element
          }
          else if(localStorageBtnChecked == element){
            element
          }
          else{
            return element.category === event.target.innerText
            }
          })
          tagUL.innerHTML = ""
          createPost(filter)
        })
      })
    }

    buttonsNav()