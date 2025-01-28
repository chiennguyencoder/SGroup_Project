const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


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

window.addEventListener("scroll", onScroll);


onScroll()