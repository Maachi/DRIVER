/**
 * Responsible for creating the jsonschemas necessary to create the edit form
 * for a recordtype schema definition
 *
 * In order to add a new FieldType, you need to do the following:
 * 1. Add a key/value pair to the module.FieldTypes object
 * 2. Add a new method in the module.Fields object for instantiating new schema objects
 *    for this type. Ensure your newly created object has a key 'options' which is of the form:
 *    {
 *        fieldType: '<new fieldtype key>'
 *    }
 *    This is so that when we serialize this object to data and back, we can remember what
 *    type of field it is.
 * 3. Add a new case for this new FieldType in the fieldFromKey method
 *
 * @return {[type]} [description]
 */
(function () {
    'use strict';

    /* ngInject */
    function Schemas() {
        var module = {
            JsonObject: jsonObject,
            FieldTypes: {
                'text': 'Text Field',
                'selectlist': 'Select List',
                'image': 'Image Uploader'
            },
            Fields: {
                TextField: textField,
                SelectList: selectList,
                ImageUploader: imageUploader
            },
            fieldFromKey: fieldFromKey
        };
        return module;

        /**
         * Map one of the field keys in Schemas.FieldTypes to one of the fields
         * in Schemas.Fields
         * @param  {string} fieldKey
         * @param  {object} fieldOptions Passed directly to Fields constructors
         * @return {object} jsonschema object generated by field method
         */
        function fieldFromKey(fieldKey, fieldOptions) {
            fieldOptions = fieldOptions || {};
            var field = null;
            switch (fieldKey) {
                case 'text':
                    field = textField(fieldOptions);
                    break;
                case 'selectlist':
                    field = selectList(fieldOptions);
                    break;
                case 'image':
                    field = imageUploader(fieldOptions);
                    break;
                default:
                    throw 'key must be one of Schemas.FieldTypes';
            }
            return field;
        }

        function jsonObject(newObject) {
            newObject = newObject || {};
            return angular.extend({}, {
                /* jshint camelcase: false */
                type: 'object',
                title: '',
                plural_title: '',
                description: '',
                properties: {},
                definitions: {}
                /* jshint camelcase: true */
            }, newObject);
        }

        function textField(newField) {
            newField = newField || {};
            var newTextField = jsonObject(newField);
            return angular.extend(newTextField, {
                headerTemplate: '{{ self.fieldTitle }}',
                properties: {
                    fieldTitle: {
                        type: 'string',
                        title: 'Field Title'
                    },
                    isRequired: {
                        type: 'boolean',
                        format: 'checkbox',
                        title: 'Required'
                    },
                    isSearchable: {
                        type: 'boolean',
                        format: 'checkbox',
                        title: 'Filterable/Searchable'
                    },
                    textOptions: {
                        type: 'string',
                        title: 'Text Options',
                        enum: [
                            'text',
                            'textarea',
                            'number',
                            'color',
                            'tel',
                            'datetime',
                            'url'
                        ],
                        options: {
                            /* jshint camelcase: false */
                            enum_titles: [
                                'Single line text',
                                'Paragraph text',
                                'Number',
                                'HTML Color',
                                'Telephone number',
                                'Date / Time',
                                'Website URL'
                            ]
                            /* jshint camelcase: true */
                        }
                    }
                },
                options: {
                    fieldType: 'text'
                }
            });
        }

        function selectList(newList) {
            newList = newList || {};
            var newSelectList = jsonObject(newList);
            return angular.extend(newSelectList, {
                headerTemplate: '{{ self.fieldTitle }}',
                properties: {
                    fieldTitle: {
                        type: 'string',
                        title: 'Field Title'
                    },
                    isRequired: {
                        type: 'boolean',
                        format: 'checkbox',
                        title: 'Required'
                    },
                    isSearchable: {
                        type: 'boolean',
                        format: 'checkbox',
                        title: 'Filterable/Searchable'
                    },
                    displayType: {
                        type: 'string',
                        enum: [
                            'select',
                            'checkbox'
                        ]
                    },
                    fieldOptions: {
                        title: 'Field Options',
                        type: 'string',
                        format: 'textarea'
                    }
                },
                options: {
                    fieldType: 'selectlist'
                }
            });
        }

        function imageUploader(newImage) {
            newImage = newImage || {};
            var newImageUploader = jsonObject(newImage);
            return angular.extend(newImageUploader, {
                headerTemplate: '{{ self.fieldTitle }}',
                properties: {
                    fieldTitle: {
                        type: 'string',
                        title: 'Field Title'
                    },
                    isRequired: {
                        type: 'boolean',
                        format: 'checkbox',
                        title: 'Required'
                    }
                },
                options: {
                    fieldType: 'image'
                }
            });
        }
    }

    angular.module('ase.schemas')
    .service('Schemas', Schemas);

})();
