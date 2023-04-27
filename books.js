//user should be able to add information 
//(e.g. author, title, genre, reviews, etc.) about their favourite books
//All the information about all the books added by the user should be listed on the webpage.

let authorValue =  document.getElementById('author');
let submitBtn =  document.getElementById("submit");
let titleValue = document.getElementById('title');
let priceValue = document.getElementById('price');
let genreValue = document.getElementById('genre');
let reviewsValue =  document.getElementById('reviews');
let updateBtn = document.getElementById("update");

//declaring array
let books = [];

//function for object creation
function Book(author,title,price,genre,reviews)
{
    this.author = author;
    this.title = title;
    this.price = price;
    this.genre = genre;
    this.reviews = reviews;
}
function addBook()
{
    //checking the session storage
    if(sessionStorage.getItem("books") == null)
    {
        books = [];
    }
    else{
        //get data from session storage and store in the array
        //using JSON.parse because data as string, we need convert to array
        books = JSON.parse(sessionStorage.getItem("books"));
    }
    //creating object
    let book1 = 
    new Book(authorValue.value,titleValue.value,priceValue.value,genreValue.value,reviewsValue.value);
    //adding values to the array
    books.push(book1);
    //adding to the session storage
    sessionStorage.setItem("books", JSON.stringify(books));
    console.log(books);
    //resetting the field empty
    authorValue.value ="";
    titleValue.value = "";
    priceValue.value = "";
    genreValue.value = "";
    reviewsValue.value = "";
    //function calling to render the books table
    booksList();
}
viewBook();
function viewBook()
{
    //checking the session storage
    if(sessionStorage.getItem("books") == null)
    {
        books = [];

    }
    else{
        //get data from session storage and store in the array
        //using JSON.parse because data as string, we need convert to array
        books = JSON.parse(sessionStorage.getItem("books"));
    }
}
booksList();
function booksList()
{
    //rendering table for books list
    console.log(books)
    let html ="";
    books.forEach(function (element, index)
    {   
        html += "<tr>";
        html += "<td>" + element.author + "</td>";
        html += "<td>" + element.title + "</td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.genre + "</td>";
        html += "<td>" + element.reviews + "</td>";
        html +=  '<td> <button type="button" class="btn btn-primary" onclick=editBook('+
        index
        +') value="Edit"> <i class="fa fa-edit"></i> Edit </button><button type="button" class="btn btn-danger" onclick=deleteBook('
        +index
        +') value="Delete"> <i class="fa fa-edit"></i> Delete </button> </td>';
        html += "</tr>";
    });
    //setting values using innerHTML
    document.querySelector("table tbody").innerHTML = html;
}


function deleteBook(index){
        //asking confirmation from the user
        let confirm = prompt("Are you sure you want to delete this book? (y/n)");
        if(confirm == 'y')
        {
            if(sessionStorage.getItem("books") == null)
            {
                books = [];
            }
            else{
                //get data from session storage and store in the array
                //using JSON.parse because data as string, we need convert to array
                books = JSON.parse(sessionStorage.getItem("books"));
            }
            //deleting from the array
            books.splice(index,1);
            sessionStorage.setItem("books", JSON.stringify(books));
            booksList();
            alert(`Deleted successfully`);
        }
        else{
            booksList();
        }       
    }

    function editBook(index){
        //calling function to hide the submit button
        buttons();
        //hiding submit button and display update button
        if(sessionStorage.getItem("books") == null)
        {
            books = [];
        }
        else{
            //get data from session storage and store in the array
            //using JSON.parse because data as string, we need convert to array
            books = JSON.parse(sessionStorage.getItem("books"));
        }
        //filling the text boxes with array values
        authorValue.value = books[index].author;
        titleValue.value = books[index].title;
        priceValue.value = books[index].price;
        genreValue.value = books[index].genre;
        reviewsValue.value = books[index].reviews;
        document.querySelector("#update").onclick = function(){
            //assingin updated values to the array 
            books[index].author     = authorValue.value, 
            books[index].title       = titleValue.value, 
            books[index].price   = priceValue.value, 
            books[index].genre     = genreValue.value,
            books[index].reviews     = reviewsValue.value
            unhide();
            booksList();
            
        }

        sessionStorage.setItem("books", JSON.stringify(books));
}

function buttons()
{
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'inline';

}

function unhide()
{
        //hiding submit button and display update button
        submitBtn.style.display = "inline";
        document.getElementById("update").style.display = "none"
}