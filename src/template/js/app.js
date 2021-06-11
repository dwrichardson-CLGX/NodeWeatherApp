console.log('RANDOM LOGGING GOES HERE')


const weatherForm = document.querySelector('form');
const searchField = document.querySelector('#ctrlAddress');
const responseField = document.querySelector('#response');
const errorField = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchField.value;
   // alert(address);

    if(address) {
        fetch(`/weather?address=${address}`).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    errorField.textContent = data.error;

                }
                else {
                    responseField.textContent = data.forecast;
                    responseField.textContent += ' ' + data.location;

                }
            })
        });
    }

})

