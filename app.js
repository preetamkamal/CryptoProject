// async function generateProof() {
//     document.getElementById('status').innerText = 'Generating proof...';

//     const locationInput = document.getElementById('location').value;
//     const authTokenInput = document.getElementById('authToken').value;

//     const countryBoundaryHash = "987654321"; // Placeholder

//     const input = {
//         location: locationInput,
//         countryBoundaryHash: countryBoundaryHash,
//         authToken: authTokenInput
//     };

//     // Send the input to the server to compute countryHash and generate the proof
//     fetch('/generate-proof', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(input)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.proofValid) {
//             document.getElementById('status').innerText = 'Proof is valid.';
//         } else {
//             document.getElementById('status').innerText = 'Proof is invalid.';
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         document.getElementById('status').innerText = 'An error occurred.';
//     });
// }


async function generateProof() {
    document.getElementById('status').innerText = 'Generating proof...';

    const locationInput = document.getElementById('location').value;
    const authTokenInput = document.getElementById('authToken').value;

    const countryBoundaryHash = "987654321"; // Use the same value as in the fixed hash

    const input = {
        location: locationInput,
        countryBoundaryHash: countryBoundaryHash,
        authToken: authTokenInput
    };

    // Send the input to the server to generate the proof
    fetch('/generate-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(data => {
        if (data.proofValid) {
            document.getElementById('status').innerText = 'Proof is valid.';
        } else {
            document.getElementById('status').innerText = 'Proof is invalid.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').innerText = 'An error occurred.';
    });
}
