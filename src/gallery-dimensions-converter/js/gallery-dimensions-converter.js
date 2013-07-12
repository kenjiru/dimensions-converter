var Dimension = function(value) {
    var vNumber = value.slice(0, -2),
        vUnit = value.slice(-2);

    if (!this._isUnitSupported(vUnit)) {
        throw new Error('unit not supported!');
    }

    if (!this._isNumber(vNumber)) {
        throw new Error('value is not a number!');
    }

    if (!Dimension._unitValues) {
        Dimension._unitValues = Dimension._calculateDimensions();
    }

    this._value = value;
    this._unit = vUnit;
    this._pixels = this._toPixels(value);
};

// static methods
Y.mix(Dimension, {
    _supportedUnits : [ 'mm', 'cm', 'in' ,'pt' ],
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
            dimNode.setStyle('width', 1 + unitName);

            unitValue = dimNode.getComputedStyle('width');
            unitValues[unitName] = parseFloat(unitValue);
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
        } else {
            return this._value;
        }
    },

    convertTo : function(unit) {
        return this._fromPixels(this._pixels, unit) + unit;
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

    _fromPixels : function(pixels, unit) {
        return pixels / Dimension._unitValues[unit];
    },

    _toPixels : function(value) {
        var vNumber = value.slice(0, -2),
            vUnit = value.slice(-2);

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
        return value && !isNaN(value) && /^\d*\.{0,1}\d*$/.test(value);
    },

    _isArray : function(value) {
        return Y.Lang.isArray(value);
    }
}, true);

Y.Dimension = Dimension;