exports.definition = {
	config: {
		columns: {
		    "filename": "TEXT",
		    "title": "TEXT",
		    "editDate": "TEXT",
		    "section": "INTEGER",
		    "itemIndex": "INTEGER",
		    "document_id": "INTEGER PRIMARY KEY AUTOINCREMENT"
		},
		adapter: {
			type: "sql",
			collection_name: "documents",
			idAttribute : "document_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			comparator : function(entry) {
				return entry.get('editDate');
			}
		});

		return Collection;
	}
};