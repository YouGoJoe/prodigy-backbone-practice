App.Collections.Todos = Backbone.Collection.extend({
    url: 'http://localhost:8000',
    model: App.Models.Todo,
});