var App = new (Backbone.View.extend({
    Models: {},
    Views: {},
    Collections: {},
    template: _.template(
        '<h1>ToDo List</h1>' +
        '<div id="app"></div>'
    ),
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    start: function () {
        this.$el.append(this.render().el);
    }

}))({ el: document.body });

$(document).ready(function () {
    App.start();

    var initTodos = new App.Collections.Todos();
    initTodos.add({ description: 'My First Todo' });
    initTodos.add({ description: 'The other Todo' })
    var initTodosView = new App.Views.TodoList({ collection: initTodos });
    initTodosView.render();
    $('#app').append(initTodosView.el);
});