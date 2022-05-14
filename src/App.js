import React from 'react';
import './App.css';

const responses = []

function App() {

  const funWithAI = () => {
    const prompt = document.getElementById('prompt').value
    console.log(prompt);
    const engine = document.getElementById('engine').value
    console.log(engine);

    const data = {
      prompt: prompt,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }

    const url = 'https://api.openai.com/v1/engines/' + engine + '/completions'
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(data => {
        const response = {
          prompt: prompt,
          data: data
        }
        responses.unshift(response)
        console.log(responses);
        document.getElementById('responses').innerHTML = responses.map(response => {
          return `<li>
          <p>Prompt: ${response.prompt}</p>
          <p>Response: ${response.data.choices[0].text}</p>
          </li>`
        }).join('')
      })
  }

  return (
    <div className="App">
      <h1>Fun With AI</h1>
      <p>Enter Prompt</p>
      <textarea name="prompt" id="prompt" cols="50" rows="10"></textarea>
      <br></br>
      <label htmlFor="engine">Select Engine:</label>
      <select name="engine" id="engine">
        <option value="text-curie-001">text-curie-001</option>
        <option value="text-davinci-002">text-davinci-002</option>
        <option value="text-babbage-001">text-babbage-001</option>
        <option value="text-ada-001">text-ada-001</option>
      </select>
      <button onClick={funWithAI}>Submit</button>
      <br></br>
      <p>Responses</p>
      <ul id="responses"></ul>
    </div>
  );
}


export default App;
