var App = new (Backbone.View.extend({
    Models: {},
    Views: {},
    Collections: {},
    template: _.template($('#main-template').html()),

    render: function () {
        this.$el.html(this.template());
        return this;
    },
    start: function () {
        this.$el.append(this.render().el);

        // Initialize some data
        App.Todos = new App.Collections.Todos();
        App.Todos.add({ description: 'My First Todo' });
        App.Todos.add({ description: 'The other Todo' });
        var initTodosView = new App.Views.TodoList({ collection: App.Todos });
        initTodosView.render();
        $('#app').append(initTodosView.el);

        // Add the form
        var todoForm = new App.Views.TodoForm();
        todoForm.render();
        $('#app').append(todoForm.el);
    }

}))({ el: document.body });

$(document).ready(function () {
    App.start();
});