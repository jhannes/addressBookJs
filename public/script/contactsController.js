var contactsController = function() {
	var parse = function(form) {
		var firstName = form.find("input[name=firstName]").val();
		var lastName = form.find("input[name=lastName]").val();
		return { 
			firstName: firstName,
			lastName: lastName
		 };
	};

	var display = function(contacts, table) {
		var tbody = $("<tbody>");
		_.each(contacts,function(contact) {
			var row = $("<tr>");
			row.append($("<td>").text(contact.firstName));
			row.append($("<td>").text(contact.lastName));
			tbody.append(row);
		});

		table.find("tbody").remove();
		table.append(tbody);
	};


	return {
		parse: parse,
		display: display
	};

};
