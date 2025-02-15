const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const navBarButton = $('.navbar-btn')
const navBarList = $('.navbar__menuList')

function onScroll(){
    const sections = $$('section')
    const navItems = $$("[class*='-nav']")

    let currentSection = null

    sections.forEach((section) => {
        const pos = section.getBoundingClientRect()
        if (section.id && pos.top >= 0 && pos.top <= window.innerHeight / 2)
            currentSection = section
    })
    
    if (currentSection){
        navItems.forEach((navItem) => {
            navItem.classList.remove('active')
        })
        const navItem = $(`.${currentSection.id}-nav`)
        if (navItem) navItem.classList.add('active')
    }
}

function toggleNavBar(){
    navBarList.classList.toggle('toggle')
}


function changeImage(){
    const workflow_items = $$('.workflow-item')
    const img = $('.workflow-img')
    // console.log(workflow_item.getAttribute('imgUrl'));
    
    workflow_items.forEach((item) => {


        item.addEventListener('click', (event) => {

            if (!item.classList.contains('active')){
                const imgUrl = item.getAttribute('imgUrl')
                const active = $('.workflow-item.active')
                active.classList.remove('active')
                item.classList.add('active')
                img.src = imgUrl
            }
        })
    })
}

function toggleTestimonialsCard(){
    const cards = $$('.testi-card')
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const active = $('.testi-card.active')
            if (card.classList.contains('active')){
                card.classList.remove('active')
            }
            else{ 
                if (active)
                    active.classList.remove('active')
                card.classList.add('active')
            }
        })
    })
}

function slider(){
    const gallery = $$('.portfolio-picture img')
    const slider = $('.slider')
    const slide = $('.slide')
    let counter;
    const counterElement = $('.counter')
    const closeBtn = $('.close-btn') 
    const nextBtn = $('.next-btn')
    const prevBtn = $('.prev-btn')

    function change(){
        document.body.style.overflow = 'hidden'
        slider.style.display = 'block'
        slide.src = `assets/img/gallery${counter}.webp`
        counterElement.innerText = `${counter} of 5`
    }

    function close(){
        slider.style.display = 'none'
        document.body.style.overflow = ''
    }
    gallery.forEach(picture => {
        picture.addEventListener('click', (event) => {
            event.stopPropagation();
            counter = Number(picture.getAttribute('number'))
            change();
        })
    })    

    closeBtn.addEventListener('click' , (event) => {
        event.stopPropagation();
        close()
    })
    slider.addEventListener('click' , (event) => {
        event.stopPropagation();
        close()
    })
    nextBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        counter += (counter < 5) ? 1 : -4; 
        change()
    })

    slide.addEventListener('click', (event) => {
        event.stopPropagation();
        counter += (counter < 5) ? 1 : -4; 
        change()
    })

    prevBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        counter -= (counter > 1) ? 1 : -4;
        change()
    })
}


function animateOnScroll(){
    const animates = $$('.animate')
    // console.log(animates);
    animates.forEach(animate => {
        animate.addEventListener('animationstart', () => {
            console.log(animate);
            animate.style.opacity = 1;
        })

        const rect = animate.getBoundingClientRect()
        if (rect.top >= 0 && rect.top <= window.innerHeight / 1.25){            // console.log(animate);
            animate.classList.add('show')
        }
    })
}

slider()
changeImage()
toggleTestimonialsCard()
window.addEventListener('scroll', animateOnScroll)

window.addEventListener("scroll", onScroll);
navBarButton.addEventListener('click', toggleNavBar)

