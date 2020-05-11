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


    /**
     * Main
    */

    // lettura e stampa todo da api
    getTodo(apiUrl, template, todoList);

}); // end doc ready

/**
 * Functions
*/

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