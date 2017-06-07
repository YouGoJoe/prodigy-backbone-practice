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

    // Global collection of Todos
    App.Todos = new App.Collections.Todos();
    App.Todos.fetch();

    // Render the list of Todos
    const initTodosView = new App.Views.TodoList({ collection: App.Todos });
    $('.app').append(initTodosView.render().el);    

    // Render the form to add Todos
    const todoForm = new App.Views.TodoForm();    
    $('.app').append(todoForm.render().el);
});