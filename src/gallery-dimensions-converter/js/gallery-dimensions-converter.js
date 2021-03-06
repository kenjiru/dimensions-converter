var Dimension = function(value) {
    if (!Dimension._unitValues) {
        Dimension._unitValues = Dimension._calculateDimensions();
    }

    if (this._isNumber(value)) {
        this._unit = 'px';
        this._pixels = parseFloat(value);
    } else {
        this._unit = value.slice(-2);
        this._pixels = this._toPixels(value);
    }
};

// static methods
Y.mix(Dimension, {
    _supportedUnits : [ 'px', 'mm', 'cm', 'in' ,'pt' ],
    _unitValues : null,

    _calculateDimensions : function() {
        var unitNames = Dimension._supportedUnits,
            unitValues = {},
            unitName, unitValue,
            bodyNode = Y.one('body'),
            dimNode = Y.Node.create('<div></div>');

        dimNode.setStyles({
            'visibility' : 'hidden',
            'position' : 'absolute'
        });
        bodyNode.append(dimNode);

        for (var i = 0; i<unitNames.length; i++) {
            unitName = unitNames[i];
            dimNode.setStyle('width', 100 + unitName);

            unitValue = dimNode.getComputedStyle('width');
            unitValue = parseFloat(unitValue) / 100;
            unitValues[unitName] = unitValue;
        }

        return unitValues;
    }
});

// prototype methods
Y.mix(Dimension.prototype, {
    _value : null,
    _unit : null,
    _pixels : null,

    toString : function() {
        if (this._pixels !== null) {
            return this._fromPixels(this._pixels, this._unit) + this._unit;
        }
    },

    convertTo : function(unit) {
        var stringValue = this._fromPixels(this._pixels, unit) + unit;

        return new Dimension(stringValue);
    },

    add : function(value) {
        if (this._isArray(value)) {
            for (var i=0; i<value.length; i++) {
                this._pixels += this._toPixels(value[i]);
            }
        } else {
            this._pixels += this._toPixels(value);
        }

        return this;
    },

    subtract : function(value) {
        if (this._isArray(value)) {
            for (var i=0; i<value.length; i++) {
                this._pixels -= this._toPixels(value[i]);
            }
        } else {
            this._pixels -= this._toPixels(value);
        }

        return this;
    },

    divide : function(byWhat) {
        var dividedUnits = this._fromPixels(this._pixels / byWhat, this._unit);

        return new Dimension(dividedUnits + this._unit);
    },

    getMeasureUnit : function() {
        return this._unit;
    },

    getNumericValue : function() {
        return this._fromPixels(this._pixels, this._unit);
    },

    getPixels : function() {
        return this._pixels;
    },

    _fromPixels : function(pixels, unit) {
        var value;

        pixels = parseFloat(pixels);
        value = pixels / Dimension._unitValues[unit];

        return value.toFixed(2);
    },

    _toPixels : function(value) {
        var vNumber,
            vUnit;

        if (this._isNumber(value)) {
            return value;
        }

        vNumber = value.slice(0, -2),
        vUnit = value.slice(-2);

        if (!this._isUnitSupported(vUnit)) {
            throw new Error('unit not supported!');
        }

        if (!this._isNumber(vNumber)) {
            throw new Error('value is not a number!');
        }

        vNumber = parseFloat(vNumber);


        if (vUnit == 'px'){
            return vNumber;
        } else {
            return vNumber * Dimension._unitValues[vUnit];
        }
    },

    _isUnitSupported : function(unit) {
        var units = Dimension._supportedUnits;

        for (var i=0; i<units.length; i++) {
            if (units[i] == unit)
                return true;
        }

        return false;
    },

    _isNumber : function(value) {
        return (value || value == 0) && !isNaN(value) && /^\-*\d*\.{0,1}\d*$/.test(value);
    },

    _isArray : function(value) {
        return Y.Lang.isArray(value);
    }
}, true);

Y.Dimension = Dimension;