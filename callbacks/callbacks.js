const verdoppeln = (num, callback) => {
    const ergebnis = num * 2;
    setTimeout(() => {
        callback(ergebnis);
    }, 1000);
};

verdoppeln(5, (ergebnis) => {
    console.log(ergebnis);
});
