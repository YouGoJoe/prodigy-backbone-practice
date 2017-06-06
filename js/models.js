/* Todo model
 * 
 * cid {string} identity property given by BackboneJS used to track objects
 * isComplete {bool} defaults to false, controls the class that shows a Todo as complete
 * description {string} the text to show for the Todo 
*/

App.Models.Todo = Backbone.Model.extend({
    defaults: {
        isComplete: false,
    },

    toggleComplete: function () {
        this.set({ 'isComplete': !this.get('isComplete') });
        this.save();
    },

    // Use LocalStorage
    sync: function (method, model, options = {}) {
        let key = 'Todo-' + model.cid;

        if (method === 'create' || method === 'update') {
            localStorage.setItem(key, JSON.stringify(model));
        }
        else if (method === 'read') {
            let result = localStorage.getItem(key);
            if (result) {
                result = JSON.parse(result);
                options.success && options.success(result);
            }
            else if (options.error) {
                options.error("Todo " + model.cid + " not found.");
            }
        }        
        else if (method === 'delete') {
            localStorage.removeItem(key);
         }
    }
});