

export const MoveToBottom = () => {
    const divs = document.querySelector('.divs')
    if(divs) {
        divs.scrollTo({
            top: divs.scrollHeight,
            behavior: 'smooth'
        })
    }
}