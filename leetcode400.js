function barcodes(input) {
    const number = input.shift()
    const regex = /^@#+[A-Z][a-zA-Z0-9]{4,}[A-Z]@#+/;
    ;

    let count = 0
    input.forEach(word => {
       count++
        if (count <= number) {
            if (regex.test(word)) {
                const digits = word.match(/\d/g);
                if (digits) {
                    const result = digits.reduce((acc, curr) => acc + curr, 0);
                    console.log(`Product group: ${Number(result)}`);
                } else {
                    console.log(`Product group: 00`);
                }
            } else {
                console.log(`Invalid barcode`);
            }
        }
    });
}
barcodes(["6",
"@#FreshFisH@#",
"@###Brea0D@###",
"@##Che4s6E@##","@#FreshFisH@#",
"@###Brea0D@###",
"@##Che4s6E@##","@#FreshFisH@#",
"@###Brea0D@###",
"@##Che4s6E@##"]);
