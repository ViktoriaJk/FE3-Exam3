const loader = document.querySelector('.loader')
loader.style.display = 'none';

async function getData() {
    loader.style.display = 'block';
    var response = await fetch('https://api.github.com/users');
    var data = await response.json();
    loader.style.display = 'none';

    const usersCont = document.getElementById('result');
    for (user of data) {
        const newDiv = document.createElement("div");
        const avatar = document.createElement("img");
        avatar.src = user.avatar_url;
        newDiv.appendChild(avatar);
        const userName = document.createElement("div");
        userName.className = 'user-name';
        userName.textContent = user.login;
        newDiv.className = 'user-item';
        newDiv.appendChild(userName);
        const button = document.createElement("button");
        button.textContent = 'Show more';
        newDiv.appendChild(button);
        const moreInfo = document.createElement("div");
        moreInfo.textContent = 'Rank: ' + user.type + '\n' + 'Admin: ' + user.site_admin;
        moreInfo.style.display = 'none';
        newDiv.appendChild(moreInfo);
        usersCont.appendChild(newDiv);
    }
    //return data;
    const buttons = document.querySelectorAll('button');
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
            if (event.target.nextSibling.style.display === 'none') {
                event.target.textContent = 'Show less';
                event.target.nextSibling.style.display = 'block';
            } else {
                event.target.textContent = 'Show more';
                event.target.nextSibling.style.display = 'none';
            }
        });
    }
}

function doSearch() {
    const filter = input.value.toUpperCase();
    const userItem = document.getElementsByClassName("user-item");
    for (i = 0; i < userItem.length; i++) {
        console.log(userItem[i])
        const userName = userItem[i].querySelector('.user-name').textContent;
        if (userName.toUpperCase().indexOf(filter) > -1) {
            userItem[i].style.display = "";
        } else {
            userItem[i].style.display = "none";
        }
    }
};

const input = document.querySelector('#input');
input.addEventListener("keyup", doSearch);

window.addEventListener("load", getData);