// Todo View
App.Views.Todo = Backbone.View.extend({
    template: _.template(
        '<div class="todo-item">' +
        '<span class="<%= isComplete ? \'complete\' : \'\' %>"><input type="checkbox" <%= isComplete ? \'checked\' : \'\' %> />' +
        '<%= description %></span>' +
        '<i class="material-icons clear">clear</i>' +
        '</div>'
    ),

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    events: {
        'change input': 'toggleComplete',
        'click i': 'deleteTodo'
    },

    toggleComplete: function () {
        this.model.toggleComplete();
    },

    deleteTodo: function () {
        this.model.destroy();
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }
});

// Create Todo View
App.Views.TodoForm = Backbone.View.extend({
    template: _.template(
        '<form class="todo-form"><input type="text" id="todoText" /><button>Save</button></form>'
    ),

    events: {
        submit: 'addTodo'
    },

    addTodo: function (e) {
        e.preventDefault();
        let inputEl = $('#todoText')[0];
        let newTodo = new App.Models.Todo({ description: inputEl.value });
        newTodo.save();
        App.Todos.add(newTodo);
        inputEl.value = null;
    },

    render: function () {
        this.$el.html(this.template());
    }
});

// Collection of Todos view
App.Views.TodoList = Backbone.View.extend({

    initialize: function () {
        this.listenTo(App.Todos, 'add', this.renderTodo)
    },

    render: function () {
        this.collection.forEach(this.renderTodo, this);
        return this;
    },

    renderTodo: function (todoItem) {
        var todoView = new App.Views.Todo({ model: todoItem });
        todoView.render();
        this.$el.append(todoView.el);
    }
});