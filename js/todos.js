// Initialize global object
let App = {
    Models: {},
    Views: {},
    Collections: {},
};

$(document).ready(function () {    

    // Render the main container for the app
    const appView = new App.Views.Main();
    $(document.body).append(appView.render().el)

    // Global collection of Todos, with some starter data
    App.Todos = new App.Collections.Todos([
        { description: 'My First Todo' },
        { description: 'The other Todo' }
    ]);

    // Render the list of Todos
    const initTodosView = new App.Views.TodoList({ collection: App.Todos });
    $('.app').append(initTodosView.render().el);

    // Render the form to add Todos
    const todoForm = new App.Views.TodoForm();    
    $('.app').append(todoForm.render().el);
});