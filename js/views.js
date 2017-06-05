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

// Colleciotn of Todos view
App.Views.TodoList = Backbone.View.extend({
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