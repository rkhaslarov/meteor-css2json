Package.describe({
	name: 'rkhaslarov:css2json',
	version: '1.0.1',
	summary: 'This package provides a css2json conventer.',
	git: 'https://github.com/rkhaslarov/css2json',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use(['underscore', 'ecmascript']);
	api.addFiles(['css2json.js']);
	api.export('CSS2JSON');
});
