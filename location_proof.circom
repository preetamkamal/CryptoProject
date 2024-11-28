pragma circom 2.0.0;

include "node_modules/circomlib/circuits/poseidon.circom";

template LocationProof() {
    // Inputs
    signal input countryHash;          // Hash of the country the user claims to be in (public input)
    signal input location;             // User's actual location (latitude and longitude)
    signal input countryBoundaryHash;  // Hash of the country's boundaries
    signal input authToken;            // Token from location service provider

    // Instantiate Poseidon hash function with 3 inputs
    component poseidonHash = Poseidon(3);

    // Connect inputs
    poseidonHash.inputs[0] <== location;
    poseidonHash.inputs[1] <== countryBoundaryHash;
    poseidonHash.inputs[2] <== authToken;

    // Compute the hash
    signal computedHash;
    computedHash <== poseidonHash.out;

    // Enforce that the computed hash equals the public country hash
    computedHash === countryHash;
}

// Specify that 'countryHash' is a public input
component main { public [countryHash] } = LocationProof();
