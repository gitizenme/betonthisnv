var moment = require('alloy/moment');
var animation = require('alloy/animation');

var documents = Alloy.Collections.documents;
documents.fetch();

var args = arguments[0] || {};

var title = args.title || $.navWin.title;
var sectionIndex = args.sectionIndex || 0;
var itemIndex = args.itemIndex || 0;

$.openAndroidView = false;

$.selectedItem = null;

function itemClick(e) {
	Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(e));

	// TODO item click should offer: view, delete or cancel
	$.selectedItem = e;
}

function clickBack(e) {
	Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(e));

}

function deleteDocument(e) {
	Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var listView = $.listView.getView('theList');
	// var item = listView.sections[e.sectionIndex].getItemAt(e.itemIndex);
	if (e.item != undefined) {
		var item = e.item;

		Ti.API.debug('addDocument.item: ' + JSON.stringify(item));

		var modelId = item.properties.modelId;
		var doc = documents.get(modelId);
		if (doc != null) {
			doc.destroy();
			documents.remove(doc);
			listView.sections[e.source.sectionIndex].deleteItemsAt(e.source.itemIndex, 1);
		} else {
			alert('Unable to delete document');
		}
	}

}

function updateListViewRow(context) {
	Ti.API.debug('addDocument.' + arguments.callee.name);

	var entry = context.attributes;

	var listView = $.listView.getView('theList');

	var section = listView.sections[0];

	var rowProps = {
		modelId : -1,
		backgroundColor : "#5AAFB5",
		selectedBackgroundColor : "#6CD1D7",
		accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
	};

	rowProps.modelId = entry.document_id;

	var listDataItem = {
		info : {
			text : entry.title,
		},
		subinfo : {
			text : "Updated " + moment(entry.editDate).fromNow()
		},
		pic : {
			image : Ti.Filesystem.applicationDataDirectory + Ti.Filesystem.separator + 'documents' + Ti.Filesystem.separator + entry.filename
		},
		properties : rowProps
	};

	section.appendItems([listDataItem]);

}

function loadData() {
	documents.fetch();

	var docsForSection = documents.where({
		section : sectionIndex
	});

	for (var i = 0, j = docsForSection.length; i < j; i++) {
		updateListViewRow(docsForSection[i]);
	};

}

function documentsChanged(context) {
	Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(context));

	updateListViewRow(context);
	$.listView.getView('loading').setOpacity(0.0);
}

documents.on('change', documentsChanged);

$.photoMedia = null;

function storeDocument() {
	Ti.API.debug('addDocument.' + arguments.callee.name);
	if ($.photoMedia != null) {
		$.listView.getView('loading').setOpacity(1.0);

		Ti.API.info("$.photoMedia.size = " + $.photoMedia.size);
		Ti.API.info("$.photoMedia.width = " + $.photoMedia.width);
		Ti.API.info("$.photoMedia.height = " + $.photoMedia.height);
		Ti.API.info("$.photoMedia.mimeType = " + $.photoMedia.mimeType);

		var scale = 0.33;

		var resizedImage = $.photoMedia.imageAsResized($.photoMedia.width * scale, $.photoMedia.height * scale);

		Ti.API.info("resizedImage.size = " + resizedImage.size);
		Ti.API.info("resizedImage.width = " + resizedImage.width);
		Ti.API.info("resizedImage.height = " + resizedImage.height);
		Ti.API.info("resizedImage.mimeType = " + resizedImage.mimeType);

		/*
		var imageView = Ti.UI.createImageView({
		image : $.photoMedia,
		width : $.photoMedia.width * scale
		});

		var imageViewBlob = imageView.toBlob();
		Ti.API.info("imageViewBlob.size = " + imageViewBlob.size);
		Ti.API.info("imageViewBlob.width = " + imageViewBlob.width);
		Ti.API.info("imageViewBlob.height = " + imageViewBlob.height);
		Ti.API.info("imageViewBlob.mimeType = " + imageViewBlob.mimeType);
		*/

		// save photo to file system
		var instream = Titanium.Stream.createStream({
			mode : Titanium.Stream.MODE_READ,
			source : resizedImage
		});

		var docsDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'documents');
		if (! docsDir.exists()) {
			docsDir.createDirectory();
		}

		var genFileName = title + '_' + moment().format('YYYYMMDDHHmmssSSS') + '.png';
		var f = Ti.Filesystem.getFile(docsDir.resolve(), genFileName);
		Ti.API.debug('f.name = ' + f.name);
		Ti.API.debug('f.nativePath = ' + f.nativePath);
		Ti.API.debug('f.resolve() = ' + f.resolve());

		var outstream = f.open(Titanium.Filesystem.MODE_WRITE);
		// Create a buffer for chunking the data.
		var buffer = Ti.createBuffer({
			length : 1024
		});
		// Read and write chunks.
		var read_bytes = 0;
		while (( read_bytes = instream.read(buffer)) > 0) {
			outstream.write(buffer, 0, read_bytes);
		}

		Ti.API.info("Image file size = " + f.size);

		// Cleanup.
		instream.close();
		outstream.close();

		// update documents collection
		var modelDate = moment();
		var entry = Alloy.createModel('documents', {
			editDate : modelDate.toISOString(),
			filename : genFileName,
			title : title + ' document',
			section : sectionIndex,
			itemIndex : itemIndex
		});
		documents.add(entry);
		entry.save({
			error : function(model, xhr, options) {
				alert('Unable to save photo, please try again.');
				if (f.exists() && f.writeable) {
					var success = f.deleteFile();
					Ti.API.info((success == true) ? 'Deleted failed photo save due to model error' : 'Unable to delete photo file: ' + docFilename);
				}
			},
			success : function(model, response, options) {
				Ti.API.info("Document added to documents collection: " + docFilename);
			}
		}, {
			wait : true
		});
	} else {
		alert('Unable to save photo, please try again.');
	}
}

function takePhoto() {
	Ti.API.debug('addDocument.' + arguments.callee.name);
	$.photoMedia = null;
	Titanium.Media.showCamera({
		success : function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				$.photoMedia = event.media;
				storeDocument();
			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
			// called when user cancels taking a picture
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this on a device with a camera');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		saveToPhotoGallery : $.listView.getView('saveToLibrarySwitch').value,
		allowEditing : false,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});

}

function selectFromLibrary() {
	Ti.API.debug('addDocument.' + arguments.callee.name);
	$.photoMedia = null;
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				$.photoMedia = event.media;
				storeDocument();
			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
			// called when user cancels taking a picture
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this on a device with a camera');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		allowEditing : false,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function clickAdd(e) {
	Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(e));

	Alloy.Globals.AuthenticateOnResume = false;
	$.openAndroidView = true;

	//  offer camera or photo library

	var opts = {
		title : 'Add Document?',
		options : ['Take Photo', 'Choose Photo', 'Cancel']
	};
	var dialog = Ti.UI.createOptionDialog(opts);

	dialog.addEventListener('click', function(e) {
		//  open the camera and take a photo
		if (e.index == 0) {
			takePhoto();
		}
		//  open photo library
		else if (e.index == 1) {
			selectFromLibrary();
		}
	});
	dialog.show();

}

function focus(e) {
	Ti.API.debug('addDocument.' + arguments.callee.name);

}

function blur(e) {
	Ti.API.debug('addDocument.' + arguments.callee.name);

}

function open() {
	Ti.API.debug('addDocument.' + arguments.callee.name);

	$.listView.getView('loading').setOpacity(1.0);
	loadData();
	$.listView.getView('loading').setOpacity(0.0);

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('addDocument.' + arguments.callee.name);
		$.openAndroidView = true;
		Alloy.Globals.AuthenticateOnResume = false;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (!$.openAndroidView) {
			Alloy.Globals.AuthenticateOnResume = true;
			$.navWin.close();
		}
	}


	$.navWin.title = title;

	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {

	function clickBack(e) {
		Ti.API.debug('addDocument.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
	}

	var leftNavButton = Alloy.createController('navBarButton').getView();
	leftNavButton.title = 'Done';
	leftNavButton.addEventListener('click', clickBack);

	var rightNavButton = Alloy.createController('navBarButton').getView();
	rightNavButton.title = 'Add';
	rightNavButton.addEventListener('click', clickAdd);

	var args = {
		title : title
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	$.navWin.rightNavButton = rightNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});

}