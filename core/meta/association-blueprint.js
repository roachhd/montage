"use strict";
/**
 @module montage/core/meta/association-reference
 @requires montage/core/core
 @requires core/promise
 @requires core/logger
 */
var Montage = require("montage").Montage;
var BlueprintReference = require("core/meta/blueprint-reference").BlueprintReference;
var PropertyBlueprint = require("core/meta/property-blueprint").PropertyBlueprint;

var logger = require("core/logger").logger("blueprint");

/**
 @class AssociationBlueprint
 */
exports.AssociationBlueprint = PropertyBlueprint.specialize( /** @lends AssociationBlueprint# */ {

    constructor: {
        value: function AssociationBlueprint() {
            this.superForValue("constructor")();
        }
    },

    serializeSelf: {
        value: function(serializer) {
            serializer.setProperty("targetBlueprint", this._targetBlueprintReference);
            PropertyBlueprint.serializeSelf.call(this, serializer);
        }
    },

    deserializeSelf: {
        value: function(deserializer) {
            PropertyBlueprint.deserializeSelf.call(this, deserializer);
            this._targetBlueprintReference = deserializer.getProperty("targetBlueprint");
        }
    },

    _targetBlueprintReference: {
        value: null
    },

    /**
     * Promise for the blueprint targeted by this association.
     *
     * **Note**: The setter expects an actual blueprint but the getter will
     * return a promise.
     *
     * @type {Property}
     * @default {Object} null
     */
    targetBlueprint: {
        serializable: false,
        get: function() {
            return this._targetBlueprintReference.promise(this.require);
        },
        set: function(blueprint) {
            this._targetBlueprintReference = new BlueprintReference().initWithValue(blueprint);
        }
    },

    /**
     * @type {Property}
     * @default {boolean} false
     */
    isAssociationBlueprint: {
        get: function() {
            return true;
        }
    }

});

