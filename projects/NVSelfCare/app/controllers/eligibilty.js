var moment = require('alloy/moment');
var animation = require('alloy/animation');

var documents = Alloy.Collections.documents;
documents.fetch();

function updateListViewRow(context, removed) {
	Ti.API.debug('eligibility.' + arguments.callee.name);

	var entry = context.attributes;

	var section = $.theList.sections[entry.section];
	var listDataItem = section.items[entry.itemIndex];

	var dateSaved = moment(entry.editDate);
	listDataItem.subinfo.text = "Updated " + dateSaved.fromNow();

	var documentsGroupdBySection = documents.groupBy(function(model) {
		return model.attributes.section;
	});

	if (documentsGroupdBySection[entry.section].length > 0) {
		listDataItem.info.text = 'Documents Added: ' + documentsGroupdBySection[entry.section].length;
	}

	section.updateItemAt(entry.itemIndex, listDataItem);

}

function documentsChanged(context) {
	Ti.API.debug('eligibility.' + arguments.callee.name + ': ' + JSON.stringify(context));

	updateListViewRow(context, false);
}

documents.on('change', documentsChanged);

function updateSections() {
	Ti.API.debug('eligibility.' + arguments.callee.name);

	var documentsGroupdBySection = documents.groupBy(function(model) {
		return model.attributes.section;
	});

	for (var idx in documentsGroupdBySection) {
		var docSection = documentsGroupdBySection[idx];

		if (docSection.length > 0) {
			var entry = docSection[docSection.length - 1].attributes;
			var dateSaved = moment(entry.editDate);

			var section = $.theList.sections[idx];
			var listDataItem = section.items[entry.itemIndex];
			// TODO this hard coded
			listDataItem.subinfo.text = "Updated " + dateSaved.fromNow();
			listDataItem.info.text = 'Documents Added: ' + docSection.length;
			section.updateItemAt(entry.itemIndex, listDataItem);

		}
	};

}

function documentsRemoved(context) {
	Ti.API.debug('eligibility.' + arguments.callee.name + ': ' + JSON.stringify(context));
	updateSections();
}

documents.on('remove', documentsRemoved);

function showDocumentView(viewArgs) {

	var controller = Alloy.createController('addDocument', viewArgs);

	if (OS_IOS) {
		controller.getView().open();
	}
}

function itemClick(e) {
	Ti.API.debug('eligibility.' + arguments.callee.name + ': ' + JSON.stringify(e));

	if (e.itemIndex == 2) {
		switch(e.sectionIndex) {
			case 0:
				Ti.API.info("PROOF HIV = " + e.sectionIndex);
				var args = {
					title : 'HIV',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			case 1:
				Ti.API.info("PROOF Residency = " + e.sectionIndex);
				var args = {
					title : 'RESIDENCY',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			case 2:
				Ti.API.info("PROOF ID = " + e.sectionIndex);
				var args = {
					title : 'IDENTIFICATION',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			case 3:
				Ti.API.info("PROOF Household = " + e.sectionIndex);
				var args = {
					title : 'HOUSEHOLD',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			case 4:
				Ti.API.info("PROOF Income Level = " + e.sectionIndex);
				var args = {
					title : 'INCOME',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			case 5:
				Ti.API.info("PROOF Assets = " + e.sectionIndex);
				var args = {
					title : 'ASSETS',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			case 6:
				Ti.API.info("PROOF Labs = " + e.sectionIndex);
				var args = {
					title : 'LABS',
					sectionIndex : e.sectionIndex,
					itemIndex : e.itemIndex
				};
				showDocumentView(args);
				break;
			default:
				Ti.API.info("Cannot handle sectionIndex = " + e.sectionIndex);
		}
	}
}

function send(e) {
	Ti.API.debug('eligibility.' + arguments.callee.name);

	Ti.API.trace('journal.' + arguments.callee.name + ": " + JSON.stringify(e));

	var zipRootDir = 'documents';
	var fileName = "NV_SexSafe_Eligibility_Documents_" + moment().format("MMDDYYYY-hhmm-A");

	var packageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, zipRootDir);
	if (! packageDir.exists()) {
		packageDir.createDirectory();
	}

	documents.fetch();
	var docFiles = documents.pluck('filename');

	var filesToSend = [];
	for (var i = 0, j = docFiles.length; i < j; i++) {
		var journalFile = Ti.Filesystem.getFile(packageDir.resolve(), docFiles[i]);
		if (OS_IOS) {
			filesToSend.push(journalFile.resolve());
		}
		if (OS_ANDROID) {
			filesToSend.push(journalFile.name);
		}
	};

	var args = {
		outputDirectory : Ti.Filesystem.applicationDataDirectory + '/',
		tempDirectory : Ti.Filesystem.tempDirectory + '/',
		zipRootDir : zipRootDir,
		zipFileName : fileName + '.zip',
		title : 'SEND\nELIGIBILITY\nDOCUMENTS',
		sendInfo : 'Please enter a password to create a password protected file that contains your Eligibility documents.\nWrite this password down and communicate it to your case manager using a separate messge.\nThis file will be encrypted and sent via the e-mail app on your device.',
		sendFileList : filesToSend
	};

	var sendMessageController = Alloy.createController('SendEncryptedMessage', args);

	if (OS_IOS) {
		sendMessageController.getView().open();
	}

	packageDir = null;
}

function onTabFocus(e) {
	Ti.API.debug('eligibility.' + arguments.callee.name);
}

function onTabBlur(e) {
	Ti.API.debug('eligibility.' + arguments.callee.name);
}

function init() {
	Ti.API.debug('eligibility.' + arguments.callee.name);

}

function open() {
	Ti.API.debug('eligibility.' + arguments.callee.name);

	init();

	updateSections();

}

if (OS_IOS) {

	var args = {
		title : "ELIGIBILITY"
	};
	$.tabWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.tabWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
	$.tabWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
}
