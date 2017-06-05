// Todo View
App.Views.Todo = Backbone.View.extend({
    template: _.template(
      '<div class="<%= isComplete ? \'complete\' : \'\' %>">' +
      '<input type="checkbox" <%= isComplete ? \'checked\' : \'\' %> />' + 
      '<span><%= description %></span>' +
      '</div>'
    ),

    initialize: function(){
        this.model.on('change', this.render, this);
    },

    events: {
        'change input': 'toggleComplete',
    },

    toggleComplete: function(){
        this.model.toggleComplete();
    },

    render: function(){
        this.$el.html(this.template(this.model.attributes));
    }
});

// Create Todo View
App.Views.TodoForm = Backbone.View.extend({
    template: _.template(
        '<form><input type="text" id="todoText" /><button>Save</button></form>'
    ),

    events: {
        submit: 'addTodo'
    },

    addTodo: function (e) {
        e.preventDefault();
        let newTodo = new App.Models.Todo({description: $('#todoText')[0].value});
        newTodo.save();
        App.Todos.add(newTodo);
    },

    render: function(){
        this.$el.html(this.template());
    }
});

// Collection of Todos view
App.Views.TodoList = Backbone.View.extend({

    initialize: function(){
        this.listenTo(App.Todos, 'add', this.renderTodo)
    },

    render: function(){
        this.collection.forEach(this.renderTodo, this);
        return this;
    },

    renderTodo: function(todoItem){
        var todoView = new App.Views.Todo({model: todoItem});
        todoView.render();
        this.$el.append(todoView.el);        
    }
});