(function () {
    'use strict';

    /* ngInject */
    function StateConfig($stateProvider) {
        $stateProvider.state('record', {
            abstract: true,
            url: '/rt/:rtuuid',
            template: '<ui-view></ui-view>'
        });
        $stateProvider.state('record.add', {
            url: '/add',
            template: '<driver-record-add-edit></driver-record-add-edit>',
            label: 'Add a Record',
            showInNavbar: false
        });
        $stateProvider.state('record.list', {
            url: '/list',
            template: '<driver-record-list></driver-record-list>',
            label: 'Record List',
            showInNavbar: true
        });
        $stateProvider.state('record.edit', {
            url: '/record/:recorduuid/edit',
            template: '<driver-record-add-edit></driver-record-add-edit>',
            label: 'Edit a Record',
            showInNavbar: false
        });
        $stateProvider.state('record.details', {
            url: '/record/:recorduuid/details',
            template: '<driver-record-details></driver-record-details>',
            label: 'Record Details',
            showInNavbar: false
        });
    }

    angular.module('driver.views.record', [
        'ase.notifications',
        'ase.resources',
        'ase.schemas',
        'datetimepicker',
        'driver.config',
        'driver.details',
        'Leaflet',
        'driver.resources',
        'json-editor',
        'ui.bootstrap',
        'ui.router',
        'uuid'
    ]).config(StateConfig);

})();
