async function generateCode() {
    const prompt = document.getElementById("prompt").value;
    const output = document.getElementById("output");
    output.textContent = "Generating...";

    try {
        const response = await fetch("http://127.0.0.1:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        if (data.choices && data.choices[0].text) {
            output.textContent = data.choices[0].text;
        } else if (data.output) {  // For some Gemini API responses
            output.textContent = data.output;
        } else {
            output.textContent = JSON.stringify(data, null, 2);
        }
    } catch (err) {
        output.textContent = "Error: " + err;
    }
}
