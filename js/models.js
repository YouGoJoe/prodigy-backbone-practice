App.Models.Todo = Backbone.Model.extend({
    defaults:{
        'isComplete' : false,
    },

    toggleComplete: function(){
        this.set({'isComplete': !this.get('isComplete')});
    }
});