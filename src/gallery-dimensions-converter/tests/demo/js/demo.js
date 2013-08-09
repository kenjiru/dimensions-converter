YUI().use('node', 'gallery-dimensions-converter', function(Y){
    var dim;

    console.log('');
    for(var i=0; i<=9; i++) {
        dim = new Y.Dimension('10.' + i + 'cm');
        console.log("toString(): " + dim.toString());
        console.log("getPixels(): " + dim.getPixels());
        console.log("convertTo('mm'): " + dim.convertTo('mm'));
    }
});

/*
    'create instance': function() {
        // TODO Create proper tests
        this.l = new Y.Dimension('20.4cm');

        Y.Assert.isNotNull(this.l);
    },

    'toString' : function() {
        Y.Assert.areEqual(this.l.toString(), '20.4cm', 'toString returned a different value!');
    },

    'convertTo' : function() {
        Y.Assert.areEqual(this.l.convertTo('mm'), '204.6771784232365mm', 'convertTo returned a different value!');
    },

    'addition methods' : function() {
        Y.Assert.areEqual(this.l.add('20mm'), '22.393382961124896cm', "add('20mm') returned a different value!");
        Y.Assert.areEqual(this.l.add(['20mm', '1.5cm', '1in']), '28.427708850289495cm', "add(['20mm', '1.5cm', '1in']) returned a different value!");
    },

    'subtraction methods' : function() {
        Y.Assert.areEqual(this.l.subtract('10mm'), '27.431017369727044cm', "subtract('10mm') returned a different value!");
        Y.Assert.areEqual(this.l.subtract(['5mm', '0.3in', '10px']), '25.905707196029777cm', "subtract(['5mm', '0.3in', '10px']) returned a different value!");
    }
}));*/
