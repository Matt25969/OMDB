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

const movieToSearch = sessionStorage.getItem('searchTerm');

const sentFrom = sessionStorage.getItem("sentFrom");

multi("GET", "http://www.omdbapi.com/?apikey=cf6d6c63&t=" + movieToSearch).then(val => {

    let data = JSON.parse(val);

if (sentFrom != 1){

    sessionStorage.setItem("history5", sessionStorage.getItem("history4"))
    sessionStorage.setItem("history4", sessionStorage.getItem("history3"))
    sessionStorage.setItem("history3", sessionStorage.getItem("history2"))
    sessionStorage.setItem("history2", sessionStorage.getItem("history1"))
    sessionStorage.setItem("history1", data.Title)

}
    
    console.log(data);

    document.getElementById('Title').innerText = data.Title;
    document.getElementById('Year').innerText = data.Year;
    document.getElementById('Rating').innerText = data.Rated;
    document.getElementById('Image').src = data.Poster;

    sessionStorage.setItem("sentFrom",0);


})
    .catch(function (error) { console.log(error.message) });

