
const buttonHandler = () => {

    const container = document.getElementById('movieTable');

    if (container.rows.length > 1) {

        let tableSize = container.rows.length;
        for (i = tableSize; i > 1; i--) {
            container.deleteRow(i - 1);
        }

    }

    let movieToSearch = document.getElementById("nameOfFilm").value;

    multi("GET", "http://www.omdbapi.com/?apikey=cf6d6c63&s=" + movieToSearch).then(val => {

        let data = JSON.parse(val);
        const container = document.getElementById('movieTable');
        console.log(data.Search);

        for (let movie of data.Search) {

            let aRow = document.createElement('tr');

            container.appendChild(aRow);

            let title = document.createElement('td');
            title.innerHTML = movie.Title;

            let year = document.createElement('td');
            year.innerHTML = movie.Year;

            let type = document.createElement('td');
            type.innerHTML = movie.Type;

            let detail = document.createElement('td');
            let detailButton = document.createElement('button');

            detailButton.id = movie.Title;
            detailButton.innerText = "More Detail";
            detailButton.onclick = detailButtonHandler;

            detail.innerHTML = detailButton;

            aRow.appendChild(title);
            aRow.appendChild(year);
            aRow.appendChild(type);
            aRow.appendChild(detailButton);

        }

    })
        .catch(function (error) { console.log(error.message) });

}

const detailButtonHandler = () => {


    sessionStorage.setItem('searchTerm', event.target.id)

    location.href = 'movie.html';
}

const multi = (method, url, body) => {

    return new Promise(

        function (res, rej) {

            const req = new XMLHttpRequest();

            req.onload = () => {

                if (req.status === 200) {
                    res(req.response);
                } else {
                    const reason = new Error('Rejected');
                    rej(reason);
                }

            }

            req.open(method, url)

            req.send(body);

        }
    );

}



for (let i = 1; i <= 4; i++) {

    if (sessionStorage.getItem('history' + i) != "null" && sessionStorage.getItem('history' + i) != null) {

        const historyMovie = sessionStorage.getItem('history' + i);


        multi("GET", "http://www.omdbapi.com/?apikey=cf6d6c63&t=" + historyMovie).then(val => {

            let data = JSON.parse(val);

            document.getElementById('history' + i).src = data.Poster;
            document.getElementById('history' + i).title = data.Title;
            document.getElementById('history' + i).onclick = imageLink;

        })
            .catch(function (error) { console.log(error.message) });



    }

}

const imageLink = () => {

    sessionStorage.setItem('searchTerm', event.target.title)
    sessionStorage.setItem("sentFrom",1);
    location.href = 'movie.html'

}