export default (
    container: HTMLElement,
    levels: Array<{ name: string, description: string}>,
    onSelect: (levelId:number) => void) => {


    const list = document.createElement('dl');
    levels.forEach((level, id) => {
        const name = document.createElement('dt');
        name.innerText = level.name;
        list.appendChild(name);
        name.onclick = () => select(id);

        const description = document.createElement('dd');
        description.innerText = level.description;
        list.appendChild(description);
        list.onclick = () => select(id);
    });

    const select = (id:number) => {
        list.remove();
        onSelect(id);
    };

    container.appendChild(list);
}