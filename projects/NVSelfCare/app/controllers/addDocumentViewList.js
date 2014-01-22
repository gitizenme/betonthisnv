


$.theList.addEventListener('itemclick', function(e) {
	Ti.API.debug('addDocumentViewList.theList.' + arguments.callee.name + ': ' + JSON.stringify(e));
    $.trigger('click', e);
});


function deleteDocument(e) {
	Ti.API.debug('addDocumentViewList.theList.' + arguments.callee.name + ': ' + JSON.stringify(e));
	var item = $.theList.sections[e.sectionIndex].getItemAt(e.itemIndex);
	Ti.API.debug('addDocumentViewList.item: ' + JSON.stringify(item));

	var eventArgs = {
		source: e,
		item: item
	};

	$.trigger('dblclick', eventArgs);
}
