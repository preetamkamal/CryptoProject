// verify.js
const snarkjs = require('snarkjs');
const fs = require('fs');

async function verifyProof() {
    const proof = JSON.parse(fs.readFileSync('build/proof.json'));
    const publicSignals = JSON.parse(fs.readFileSync('build/public.json'));
    const vKey = JSON.parse(fs.readFileSync('build/verification_key.json'));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Proof is valid");
    } else {
        console.log("Proof is invalid");
    }
}

verifyProof();
