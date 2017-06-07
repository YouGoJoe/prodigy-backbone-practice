/* Todo model
 * 
 * cid {string} identity property given by BackboneJS used to track objects
 * isComplete {bool} defaults to false, controls the class that shows a Todo as complete
 * description {string} the text to show for the Todo 
*/

App.Models.Todo = Backbone.Model.extend({
    url: 'http://localhost:8000',

    defaults: {
        isComplete: false,
    },

    toggleComplete: function () {
        this.set({ 'isComplete': !this.get('isComplete') });
        this.save();
    },

    destroy: function(options = {}){
        this.trigger('destroy', this, this.collection, options);
        this.sync('delete', this, options);
    },
});