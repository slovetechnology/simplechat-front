

export const MoveToBottom = () => {
    const divs = document.querySelector('.divs')
    divs.scrollTo({
        top: divs.scrollHeight,
        behavior: 'smooth'
    })
}