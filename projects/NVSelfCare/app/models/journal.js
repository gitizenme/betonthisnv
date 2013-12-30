exports.definition = {
	config: {
		columns: {
		    "editDate": "TEXT",
		    "sortDate": "TEXT",
		    "data": "TEXT",
		    "displayData": "TEXT",
		    "section" : "INTEGER",
		    "type": "INTEGER",
		    "journal_id" : "INTEGER PRIMARY KEY AUTOINCREMENT"
		},
		adapter: {
			type: "sql",
			collection_name: "journal",
			idAttribute: "journal_id"
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
		});

		return Collection;
	}
};