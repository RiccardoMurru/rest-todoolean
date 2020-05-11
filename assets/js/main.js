/**
 * Creazione di una todo list con le seguenti funzionalità, attraverso l’uso delle API, AJAX, jQuery e Handlebars
 * Lettura di tutti i todo
 * Creazione nuovo todo
 * Cancellazione todo
 */

$(document).ready(function () {
    // refs
    var inputBar = $('.todo-input');
    var addBtn = $('.add-btn');
    var todoList = $('.todo-list');
    var apiUrl = 'http://157.230.17.132:3013/todos';

    // handlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);


    /********************
     * Main functionality
    *********************/

    // lettura e stampa todo da api
    getTodo(apiUrl, template, todoList);

    // post nuovo todo a click bottone
    addBtn.click(function () {
        postTodo(inputBar, apiUrl, template, todoList);
    });

    // post nuovo todo con invio
    inputBar.keyup(function (ev) {
        if (ev.which == 13) {
            postTodo(inputBar, apiUrl, template, todoList);
        }
    });

    // cancella todo a click su icona
    $('body').on('click', '.remove-icon', function () {
        deleteTodo($(this), apiUrl, template, todoList);
    });

}); // end doc ready

/************
 * Functions
*************/

// lettura e stampa todo da api
function getTodo(apiUrl, template, container) {
    container.html('');

    // ajax request
    $.ajax({
        url: apiUrl,
        method: 'GET',
    }).done(function (response) {
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            var context = {
                text: item.text,
                id: item.id
            }
            var output = template(context);
            container.append(output);
        }
    }).fail(function (err) {
        console.log('errore in lettura todo', err.status, err.statusText);
    })
}

// post nuovo todo 
function postTodo(input, apiUrl, template, container) {
    var todoText = input.val().trim();

    $.ajax({
        url: apiUrl,
        method: 'POST',
        data: {
            text: todoText
        }
    }).done(function () {
        getTodo(apiUrl, template, container);
    }).fail(function (err) {
        console.log('errore in post todo', err.status, err.statusText);
    })
    input.val('');
}

// cancella todo
function deleteTodo(self, apiUrl, template, container) {
    var todoId = self.parent().data('id');
    $.ajax({
        url: apiUrl + '/' + todoId,
        method: 'DELETE'
    }).done(function () {
        getTodo(apiUrl, template, container);
    }).fail(function (err) {
        console.log('errore in cancellazione todo', err.status, err.statusText);
    })
}