App.Models.Todo = Backbone.Model.extend({
    defaults: {
        'isComplete': false,
    },

    toggleComplete: function () {
        this.set({ 'isComplete': !this.get('isComplete') });
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