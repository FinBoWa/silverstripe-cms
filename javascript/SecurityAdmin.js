(function($) {
	
	var refreshAfterImport = function(e) {
		// Check for a message <div>, an indication that the form has been submitted.
		var existingFormMessage = $($(this).contents()).find('.message');
		if(existingFormMessage && existingFormMessage.html()) {
			// Refresh member listing
			var memberTableField = $(window.parent.document).find('#Form_EditForm_Members').get(0);
			if(memberTableField) memberTableField.refresh();
			
			// Refresh tree
			var tree = $(window.parent.document).find('#sitetree').get(0);
			if(tree) tree.reload();
		}
	};
	
	/**
	 * Refresh the member listing every time the import iframe is loaded,
	 * which is most likely a form submission.
	 */
	$(window).bind('load', function(e) {
		$('#MemberImportFormIframe,#GroupImportFormIframe').concrete({
			onmatch: function() {
				this._super();
				
				// TODO concrete can't seem to bind to iframe load events
				$(this).bind('load', refreshAfterImport);
			}
		});
	})
	
	/**
	 * Delete selected folders through "batch actions" tab.
	 */
	$(document).ready(function() {
		$('#Form_BatchActionsForm').concrete('ss').register(
			// TODO Hardcoding of base URL
			'admin/security/batchactions/delete', 
			function(ids) {
				var confirmed = confirm(
					ss.i18n.sprintf(
						ss.i18n._t('SecurityAdmin.BATCHACTIONSDELETECONFIRM'),
						ids.length
					)
				);
				return (confirmed) ? ids : false;
			}
		);
	});
	
	$.concrete('ss', function($){
		$('#Form_EditForm .Actions #action_addmember').concrete({
			onclick: function(e) {
				// CAUTION: Assumes that a MemberTableField-instance is present as an editing form
				var t = $('#Form_EditForm_Members');
				t[0].openPopup(
					null,
					$('base').attr('href') + t.find('a.addlink').attr('href'),
					t.find('table')[0]
				);
				return false;
			}
		});
	});
	
}(jQuery));