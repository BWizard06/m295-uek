const simuliereVerzoegerung = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};


const addiereNachverzoegerung = async (a, b, ms) => {
    await simuliereVerzoegerung(ms);
    console.log(a + b)
}

addiereNachverzoegerung(3, 7, 2000)