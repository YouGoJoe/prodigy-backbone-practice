App.Views.Todo = Backbone.View.extend({
    template: _.template(
      '<div>' +
      '<input type="checkbox" />' + 
      '<%= description %>' +
      '</div>'
    ),

    render: function(){
        this.$el.html(this.template(this.model.attributes));
    }
});