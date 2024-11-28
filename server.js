// // server.js
// const express = require('express');
// const snarkjs = require('snarkjs');
// const circomlibjs = require('circomlibjs');
// const fs = require('fs');

// const app = express();
// app.use(express.json());
// app.use(express.static('.')); // Serve static files (index.html, app.js)

// app.post('/generate-proof', async (req, res) => {
//     try {
//         const input = req.body;

//         // Convert inputs to BigInts
//         const location = BigInt(input.location);
//         const countryBoundaryHash = BigInt(input.countryBoundaryHash);
//         const authToken = BigInt(input.authToken);

//         // Compute countryHash using circomlibjs
//         const poseidon = await circomlibjs.buildPoseidon();
//         const hash = poseidon([location, countryBoundaryHash, authToken]);
//         const countryHash = poseidon.F.toObject(hash);

//         // Prepare input for the circuit
//         const circuitInput = {
//             location: location.toString(),
//             countryBoundaryHash: countryBoundaryHash.toString(),
//             authToken: authToken.toString(),
//             countryHash: countryHash.toString()
//         };

//         // Log circuit input
//         console.log('Circuit Input:', circuitInput);

//         // Generate witness using witness_calculator
//         const wc = require('./build/location_proof_js/witness_calculator.js');

//         const wasmBuffer = fs.readFileSync('./build/location_proof_js/location_proof.wasm');
//         const witnessCalculator = await wc(wasmBuffer);

//         const witnessBuffer = await witnessCalculator.calculateWTNSBin(circuitInput, 0);
//         fs.writeFileSync('build/witness.wtns', witnessBuffer);

//         // Generate proof
//         const { proof, publicSignals } = await snarkjs.groth16.prove(
//             'build/circuit_final.zkey',
//             'build/witness.wtns'
//         );

//         // Log public signals and proof
//         console.log('Public Signals:', publicSignals);
//         console.log('Expected countryHash:', circuitInput.countryHash);

//         // Verify proof
//         const vKey = JSON.parse(fs.readFileSync('build/verification_key.json'));

//         const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

//         // Log verification result
//         console.log('Verification Result:', isValid);

//         res.json({ proofValid: isValid });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ proofValid: false, error: error.message });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


// server.js
const express = require('express');
const snarkjs = require('snarkjs');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('.')); // Serve static files (index.html, app.js)

// Use the fixed countryHash
const FIXED_COUNTRY_HASH = '2993210988935427215825969653112549519321213920087815218423392548970541518239'; // Replace with your actual fixed countryHash

app.post('/generate-proof', async (req, res) => {
    try {
        const input = req.body;

        // Convert inputs to BigInts
        const location = BigInt(input.location);
        const countryBoundaryHash = BigInt(input.countryBoundaryHash);
        const authToken = BigInt(input.authToken);

        // Prepare input for the circuit
        const circuitInput = {
            location: location.toString(),
            countryBoundaryHash: countryBoundaryHash.toString(),
            authToken: authToken.toString(),
            countryHash: FIXED_COUNTRY_HASH // Use the fixed countryHash
        };

        // Log circuit input
        console.log('Circuit Input:', circuitInput);

        // Generate witness using witness_calculator
        const wc = require('./build/location_proof_js/witness_calculator.js');
        const wasmBuffer = fs.readFileSync('./build/location_proof_js/location_proof.wasm');
        const witnessCalculator = await wc(wasmBuffer);
        const witnessBuffer = await witnessCalculator.calculateWTNSBin(circuitInput, 0);
        fs.writeFileSync('build/witness.wtns', witnessBuffer);

        // Generate proof
        const { proof, publicSignals } = await snarkjs.groth16.prove(
            'build/circuit_final.zkey',
            'build/witness.wtns'
        );

        // Log public signals and proof
        console.log('Public Signals:', publicSignals);
        console.log('Expected countryHash:', FIXED_COUNTRY_HASH);

        // Verify proof
        const vKey = JSON.parse(fs.readFileSync('build/verification_key.json'));
        const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

        // Log verification result
        console.log('Verification Result:', isValid);

        res.json({ proofValid: isValid });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ proofValid: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
