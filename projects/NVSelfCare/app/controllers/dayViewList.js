


$.dayViewList.addEventListener('itemclick', function(e) { 
	Ti.API.debug('dayViewList.' + arguments.callee.name + ': ' + JSON.stringify(e));
    $.trigger('click', e); 
});