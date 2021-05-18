function handleSubmit(event) {
    event.preventDefault()
    document.getElementById('formResults').innerHTML = ''
    // check what text was put into the form field
    let userText = document.getElementById('name').value

    if(Client.validURL(userText)) {
        console.log('URL: ' + userText)
        fetchData('http://localhost:8081/api', { url: userText }).then((data) => {
            console.log("data:", data);
            document.getElementById('formResults').innerHTML = 
            `
            <h3><strong>Form Results:</strong></h3>
            <hr />
            <b>Title:</b>
            ${data.sentence_list[0].text} <br/>
            <b>Score Tag:</b> 
            ${data.score_tag} <br/>
            <b>agreement:</b> 
            ${data.agreement}<br />
            <b>Confidence:</b> 
            ${data.confidence}<br />
            <b>Subjectivity:</b> 
            ${data.subjectivity}<br />
            <b>Irony:</b> ${data.irony} `
        });
    } else {
        alert('The link you are entered is not valid , Please try with a valid URL')
    }
}
const fetchData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type supposed to match "Content-Type" header        
    });
    try {
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.log("error", error);
    }
};
export { handleSubmit }