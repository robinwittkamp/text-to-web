const fetchEdit = async (input, instruction, endpointUrl) => {
  try {
    const response = await fetch(`http://localhost:3000/api/models/${endpointUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, instruction }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default fetchEdit;
