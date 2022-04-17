// function helloWorld() {
//     console.log('hello world！！！！');

// }

function getString() {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve('hello');
        }, 2000);
    })
}

async function helloWorld() {
    let str = await getString();
    console.log(str);
}
export default helloWorld;