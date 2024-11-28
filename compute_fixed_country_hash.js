// compute_fixed_country_hash.js
const circomlibjs = require('circomlibjs');

async function computeFixedCountryHash() {
    const poseidon = await circomlibjs.buildPoseidon();

    const validLocation = BigInt("123456789");          // Valid location
    const validCountryBoundaryHash = BigInt("987654321"); // Valid country boundary hash
    const validAuthToken = BigInt("111222333");          // Valid auth token

    const inputs = [validLocation, validCountryBoundaryHash, validAuthToken];
    const hash = poseidon(inputs);
    const countryHash = poseidon.F.toObject(hash);

    console.log('Fixed countryHash:', countryHash.toString());
}

computeFixedCountryHash();
