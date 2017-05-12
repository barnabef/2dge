/**
 * Created by barnabef on 2/8/17.
 */
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../javascripts/app',
        fabric: 'fabric/dist/fabric.require',
        jquery: 'jquery/dist/jquery'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);