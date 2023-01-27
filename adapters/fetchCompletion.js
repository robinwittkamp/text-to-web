const fetchCompletion = async (newPrompt, endpointUrl) => {
  try {
    const response = await fetch(`http://localhost:3000/api/models/${endpointUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: newPrompt }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default fetchCompletion;
