let TextArea = (function(){
    // This constructor object takes 2 arguments:
    // The selector for the element in the DOM to write to
    // An options object containing data and an HTML template.
    // The constructor combines the data into the HTML template and plops that into the element selector.

    function Constructor (selector, opts) {
        this.elem = document.querySelector(selector);
        this.data = opts.data;
        this.template = opts.template;
    }

    return Constructor;

});

export default TextArea;