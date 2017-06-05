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