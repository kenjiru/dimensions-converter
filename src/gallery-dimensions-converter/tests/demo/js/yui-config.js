/**
 * This configuration is meant to be used from inside a web server.
 * It won't work if run from the local file system.
 */
YUI_config = {
    filter: "raw",
    debug: true,
    combine: true,
    base: 'http://yui.yahooapis.com/3.11.0/build/',

    groups: {
        DimensionsConverter: {
            base: '/build/',
            combine: false,

            modules: {
                'gallery-dimensions-converter' : {}
            }
        }
    }
};