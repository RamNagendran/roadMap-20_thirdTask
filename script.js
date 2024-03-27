// style objects....
var buttonStyles = {
    background: "rgb(8 63 149)",
    border: "none",
    width: "25%",
    margin: "0px 8px",
    color: "#fff"
}
var titleStyles = {
    fontSize: "40px",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: "10px",
};

// --------- Api function --------------------------------
async function quotesApi(count) {
    try {
        const res = await fetch(`https://api.breakingbadquotes.xyz/v1/quotes/${count}`)
        return res.json()
    } catch (e) {
        console.error(e)
    }
}

// ----------- main function --------------------------------
(async function () {
    const containerDiv = document.createElement('div')
    containerDiv.setAttribute('class', 'container-fluid p-5')
    const titleDiv = document.createElement('div')
    titleDiv.innerText = "Breaking Bad Quotes!"
    Object.assign(titleDiv.style, titleStyles)
    // Header includes search and submit button...
    const headerDiv = document.createElement('div')
    headerDiv.setAttribute('class', 'd-flex align-items-center justify-content-between w-100')

    const search = document.createElement('input');
    search.setAttribute('type', 'number');
    search.style.width = '75%';
    search.setAttribute('placeholder', 'Enter the number of quotes you want...')

    const button = document.createElement('button');
    Object.assign(button.style, buttonStyles) // assigning that style object to button...
    button.innerText = "Submit"

    headerDiv.append(search, button)
    containerDiv.append(titleDiv, headerDiv)

    const containerBody = document.createElement('div');
    containerBody.setAttribute('id', "body")
    containerDiv.append(containerBody);
    button.addEventListener('click', async () => {
        const getbody = document.querySelector('#body');
        getbody.innerHTML = "<div>Loading...</div>"
        var res = await quotesApi(search.value)
        // content part...
        if (res) {
            getbody.innerHTML = '';
            const rowRes = await createCard(res)
            getbody.append(rowRes)
        }
    })
    document.body.append(containerDiv);
})()

// ----- get data from api and building cards with api datas --------------------
async function createCard(data) {
    let images = [
        './assets/images/img1.jpg',
        './assets/images/img2.jpg',
        './assets/images/img3.jpeg',
        './assets/images/img4.jpeg',
        './assets/images/img5.jpg',
        './assets/images/img6.jpg',
        './assets/images/img7.png',
    ]
    const rowDiv = document.createElement('div')
    rowDiv.setAttribute('class', 'row')
    if (data) {
        data.forEach((items, index) => {
            const randomImage = images[Math.floor(Math.random() * 7)]
            const colDiv = document.createElement('div')
            colDiv.setAttribute('class', 'col-sm-12 col-md-4 col-lg-3')
            const card = `
                <div class="card p-2 mt-4 border " style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;" >
                    <img class="card-img-top"height="200px" src="${randomImage}" alt="Card image cap">    
                    <div class="card-body">
                        <div style="height:250px" class="d-flex flex-column align-items-start" >
                            <span>Quote: </span>
                            <div style="font-size: 24px; height:100%; padding:5px; overflow:auto; width:100%; " title="${items?.quote}" class="card-title d-flex align-items-center ">“${items?.quote}“</div>
                        </div>
                        <h6 class="card-title text-truncate" >Author: ${items?.author}</h6>
                    </div>
                </div>
            `
            colDiv.innerHTML = card
            rowDiv.append(colDiv)
        })
    }
    return rowDiv;
}