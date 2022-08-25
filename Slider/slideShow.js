const images = [
    {
        src : "./image/flowers-276014__340.jpg",
        alt : "flower"
    },
    {
        src : "./image/pexels-jonathan-petersson-1237119.jpg",
        alt : "jonathan peterson"
    },
    {
        src : "./image/pexels-pixabay-414102.jpg",
        alt : "pixabay"
    },
    {
        src : "./image/stock-photo-142984111-1500x1000.jpg" ,
        alt : "stock"
    },
    {
        src : "./image/man-walking-dog.jpg",
        alt : "man with dog"
    }
]

function makeSlideShow(slider){
    const sliderMain = document.querySelector(slider + '-main')
    const nextBtn = document.querySelector(slider + '-btn-next')
    const prevBtn = document.querySelector(slider + '-btn-prev')
    const sliderDots = document.querySelector(slider + '-dots')
    let positionX = 0
    let current = 0
    let subSlider = slider.slice(1)

    //Render slide
    let imageLists = images.map(value => `<div class="${subSlider}-item"><img src=${value.src} alt=${value.alt}></div>`)
    sliderMain.innerHTML = imageLists.join('')
    const sliderItems = document.querySelectorAll(slider + '-item')
    const sliderWidth = sliderItems[0].offsetWidth

    //Render dots
    let htmlStr = ''
    sliderItems.forEach( () => 
        htmlStr += `<li class="${subSlider}-dot-item"><i class="fa-solid fa-circle"></i></li>`)
    sliderDots.innerHTML = htmlStr

    const sliderDotItems = document.querySelectorAll(slider + '-dot-item')
    sliderDotItems[current].classList.add('active')
    
    //Click dot
    sliderDotItems.forEach( (item, index) => item.onclick = () =>{
        sliderDotItems.forEach(item => item.classList.remove('active'))
        item.classList.add('active')
        let jump = index - current
        current = index
        positionX -= sliderWidth * jump
        sliderMain.style = `transform: translateX(${positionX}px)`
    })

    //Previous & Next click
    nextBtn.onclick = () => handleChangeSlide(1)
    prevBtn.onclick = () => handleChangeSlide(-1)

    setInterval(() => {
        handleChangeSlide(1)
    }, 5000)
    
    //Change slide
    function handleChangeSlide(dir) {
        if(dir === 1){
            if(current < sliderItems.length - 1){
                current ++
                positionX -= sliderWidth
            }else if(current === sliderItems.length - 1) {
                current = 0
                let jump = current - (sliderItems.length - 1)
                positionX -= sliderWidth * jump
            }
        }else if(dir === -1){
            if(current > 0){
                current--
                positionX += sliderWidth
            }else if(current === 0) {
                current = sliderItems.length - 1
                let jump = current
                positionX -= sliderWidth * jump
            }
        }
        sliderMain.style = `transform: translateX(${positionX}px)`
        sliderDotItems.forEach(item => item.classList.remove('active'))
        sliderDotItems[current].classList.add('active')
    }
}

export default makeSlideShow
