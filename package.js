Package.describe({
  name: 'bobbigmac:react-simpleform',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Form input react components. Updates reactively on client and can ssr.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/bobbigmac/meteor-react-simpleform',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('react@0.14.3');

  api.addFiles([
    'react-simpleform.js',
    'components/TextInput.jsx',
    'components/TagsInput.jsx',
  ], ['client', 'server']);

  api.export("SimpleForm", ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('react');
  api.use('tinytest');

  api.use('bobbigmac:react-simpleform');
  api.addFiles('react-simpleform-tests.js');
});
