// App View
App.Views.Main = Backbone.View.extend({
    template: _.template($('#main-template').html()),

    render: function () {
        this.$el.html(this.template());
        return this;
    },
});

// Todo View
App.Views.Todo = Backbone.View.extend({
    template: _.template($('#todo-item').html()),

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
        return this;
    }
});

// Create Todo View
App.Views.TodoForm = Backbone.View.extend({
    template: _.template($('#todo-form').html()),

    events: {
        submit: 'addTodo'
    },

    addTodo: function (e) {
        e.preventDefault();
        let inputEl = this.$('.todo__input')[0];
        let newTodo = new App.Models.Todo({ description: inputEl.value });
        newTodo.save();
        App.Todos.add(newTodo);
        inputEl.value = '';
    },

    render: function () {
        this.$el.html(this.template());
        return this;
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