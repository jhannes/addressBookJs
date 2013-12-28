chai.should();

describe("Phonebook", function() {
	describe("Submit new contact", function() {
		it("should parse form", function() {
			var form = $("<form>");
			form.append($("<input name='firstName' value='Darth' >"));
			form.append($("<input name='lastName' value='Vader' >"));

			var contact = contactsController().parse(form);

			contact.firstName.should.equal("Darth");
			contact.lastName.should.equal("Vader");
		});

	});

	describe("Display contacts", function() {
		it("should display one row per contact", function() {
			var controller = contactsController();
			var table = $("<table>");
			var contacts = [
				{firstName: "Darth"},
				{firstName: "Anakin"}
			];
			controller.display(contacts,table);
			controller.display(contacts,table);
			table.find("tbody tr").should.have.length(contacts.length);
		});

		it("displays contact properties", function() {
			var controller = contactsController();
			var table = $("<table>");
			var contacts = [
				{firstName: "Darth", lastName: "Vader"}
			];

			controller.display(contacts, table);
			var cells = table.find("tbody tr td");
			$(cells[0]).text().should.equal(contacts[0].firstName);
			$(cells[1]).text().should.equal(contacts[0].lastName);
		});


	});


});

