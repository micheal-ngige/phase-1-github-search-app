var form = document.getElementById("github-form")

form.addEventListener('submit', function(event){
    event.preventDefault()

    var search = document.getElementById("search").value

    var originalName = search.split(' ').join('')

    // clear previous serach result
    document.getElementById("user-list").innerHTML = ""



    fetch("https://api.github.com/users/"+originalName)
    .then(response => response.json())
    .then(data => {
        console.log(data)


        document.getElementById("user-list").innerHTML =  `
        <a target="_blank" href="https://www.github.com/${originalName}"><img src="${data.avatar_url}"></a>
    `;


    fetch("https://api.github.com/search/users?q=" + originalName)
    .then(response => response.json())
    .then(searchData => {
        var users = searchData.items;
        for (var user of users) {
            var listItem = document.createElement("li");
            var link = document.createElement("a");
            link.target = "_blank";
            link.href = user.html_url;
            link.textContent = user.login;
            listItem.appendChild(link);
            document.getElementById("user-list").appendChild(listItem);
        }
    });


    })



});