//Listen for form submit 

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Get form values 

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Local storage stores data as string
    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    else {
        // JSON.parse turns string into JSON
        var bookmarks = JSON.parse((localStorage.getItem('bookmarks')));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
 
    //clear the form
    document.getElementById('myForm').reset();

    //Refetch  the bookmarks
    fetchBookmarks();
    //Prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.slice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Refetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    // Get bookmarks from local storage 
    var bookmarks = JSON.parse((localStorage.getItem('bookmarks')));
    console.log(bookmarks);

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        console.log(url);
        bookmarksResults.innerHTML += '<div class="card bg-white border-secondary mb-3">' + '<div class="card-header">' + "Favourite Site " + (i + 1) + '</div>' +
            '<div class="card-body">' + '<h4>' + name + '  <a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a>' + ' <a class="btn btn-danger" onclick="deleteBookmark(\'' + url + '\')">Delete</a>' + '</h4>' +
            '</div>' +
            '</div>'
    }
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid url');
        return false;
    }

    return true;
}