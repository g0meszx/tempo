document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cityRadio = document.getElementById('cityRadio').checked;
    const zipRadio = document.getElementById('zipRadio').checked;

    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();

    if (cityRadio && !city) {
        document.getElementById('result').innerHTML = `<p style="color: red;">Por favor, preencha o nome da cidade.</p>`;
        return;
    }

    if (zipRadio && !zip) {
        document.getElementById('result').innerHTML = `<p style="color: red;">Por favor, preencha o CEP.</p>`;
        return;
    }

    const query = cityRadio ? city : zip;
    const url = `https://wttr.in/${query}?format=j1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Cidade ou CEP não encontrado.');
        }

        const data = await response.json();
        const currentCondition = data.current_condition[0];
        const resultDiv = document.getElementById('result');

        resultDiv.innerHTML = `
            <h2>Clima Atual</h2>
            <p><strong>Temperatura:</strong> ${currentCondition.temp_C}°C</p>
            <p><strong>Clima:</strong> ${currentCondition.weatherDesc[0].value}</p>
            <p><strong>Umidade:</strong> ${currentCondition.humidity}%</p>
            <p><strong>Vento:</strong> ${currentCondition.windspeedKmph} km/h</p>
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

// Alternar entre os campos de entrada com base na seleção do botão de rádio
document.getElementById('cityRadio').addEventListener('change', function() 
{
    document.getElementById('city').disabled = false;
    document.getElementById('zip').disabled = true;
});

document.getElementById('zipRadio').addEventListener('change', function() 
{
    document.getElementById('city').disabled = true;
    document.getElementById('zip').disabled = false;
});