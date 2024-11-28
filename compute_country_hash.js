// compute_country_hash.js
const circomlibjs = require('circomlibjs');

async function computeCountryHash() {
    const poseidon = await circomlibjs.buildPoseidon();

    const location = BigInt("123456789");
    const countryBoundaryHash = BigInt("987654321");
    const authToken = BigInt("111222333");

    const inputs = [location, countryBoundaryHash, authToken];

    const hash = poseidon(inputs);
    const countryHash = poseidon.F.toObject(hash);

    console.log('countryHash:', countryHash.toString());

    // Update input.json
    const fs = require('fs');
    let inputData = {
        location: location.toString(),
        countryBoundaryHash: countryBoundaryHash.toString(),
        authToken: authToken.toString(),
        countryHash: countryHash.toString()
    };
    fs.writeFileSync('input.json', JSON.stringify(inputData, null, 2));
}

computeCountryHash();
