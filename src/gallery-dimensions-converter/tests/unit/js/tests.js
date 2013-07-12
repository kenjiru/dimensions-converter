YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('gallery-dimensions-converter');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        'test is empty': function() {
            // TODO Create proper tests
            var l = new Dimension('20.4cm');

            console.log("l.toString(): 20.4cm: " + l);
            console.log("l.convertTo('mm'): 204: " + l.convertTo('mm'));

            console.log("l.add('20mm'): 22.4cm: " + l.add('20mm'));
            console.log("l.add(['20mm', '1.5cm', '1in']): : " + l.add(['20mm', '1.5cm', '1in']));

            console.log("l.subtract('10mm'): 21.4cm: " + l.subtract('10mm'));
            console.log("l.subtract(['5mm', '0.3in', '10px']): : " + l.subtract(['5mm', '0.3in', '10px']));
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'test' ] });
