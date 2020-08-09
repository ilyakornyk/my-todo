
const JSONPlaceholder = async () => {
    const items = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=1`)
    const data = await items.json();

    const newItem = data.map(item => {
        const {id} = item;
        const {title: label} = item;
        const {completed: done} = item;

        return {
            id,
            label,
            important: false,
            done,
        }
    });

    
    // const newItem = [{id: 1, label: '111asdasd', important: false, done: false},
    //                 {id: 2, label: 'adsada', important: false, done: false},
    //                 {id: 3, label: 'xcxvzxjh', important: false, done: true}]
    
    return newItem;

    
}

export default JSONPlaceholder;
