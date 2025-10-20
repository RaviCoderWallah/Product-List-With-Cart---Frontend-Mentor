export const createElement = (element, className, elConent) => {
    const createEL = document.createElement(element);
    createEL.classList.add(className);
    createEL.innerHTML = elConent;
    return createEL;
}