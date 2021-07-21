export default function submitToAPI(e) {
  e.preventDefault();

  const url = 'https://0wv1ypl3ki.execute-api.us-east-1.amazonaws.com/submitContactForm';
  const data = {
    name: 'Test name',
    phone: 'Test phone',
    email: 'Test email',
    desc: 'Test desc',
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
