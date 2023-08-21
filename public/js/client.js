'use strict';

(function () {
	require(['markdown'], (markdown) => {
		$(window).on('action:composer.enhanced', function (evt, data) {
			var textareaEl = data.postContainer.find('textarea');
			markdown.capturePaste(textareaEl);
			markdown.prepareFormattingTools();
		});

		$(window).on('action:composer.preview', {
			selector: '.composer .preview pre code',
		}, markdown.highlight);

		$(window).on('action:posts.loaded action:topic.loaded action:posts.edited', function (ev, data) {
			require(['components'], function (components) {
				markdown.highlight(components.get('post/content').find('pre code'));
			});

			markdown.enhanceCheckbox(ev, data);
		});
	});
}());
