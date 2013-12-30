


$.theList.addEventListener('itemclick', function(e) { 
	Ti.API.debug('theList.' + arguments.callee.name + ': ' + JSON.stringify(e));
    $.trigger('click', e); 
});