/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS 
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */

'use strict';

(function () {

    var ServiceNowQueryWidgetViewController = function ($scope, ServiceNowQueryService) {
        var vm = this;
        var xlrWidget = $scope.xlrWidget;

        vm.refresh = refresh;

        function widgetConfigurationIsPopulated() {
            return !_.isEmpty(xlrWidget.widget.servicenowServer) && !_.isEmpty(xlrWidget.widget.query);
        }

        function refresh() {
            if (widgetConfigurationIsPopulated()) {
                vm.loading = true;
                ServiceNowQueryService.executeQuery(xlrWidget.widget).then(
                    function(response) {
                        vm.issues = response.data.entity;
                    }
                ).finally(function() {
                    vm.loading = false;
                });
            }
        }

        refresh();
    };

    ServiceNowQueryWidgetViewController.$inject = ['$scope', 'xlrelease.servicenow.ServiceNowQueryService'];

    var ServiceNowQueryWidgetConfigController = function (ServiceNowQueryService) {
        var vm = this;

        function loadServiceNowServers() {
            ServiceNowQueryService.getServers().then(function (result) {
                vm.servicenowServers = result.data.entity;
            });
        }

        loadServiceNowServers();
    };

    ServiceNowQueryWidgetConfigController.$inject = ['xlrelease.servicenow.ServiceNowQueryService'];

    var ServiceNowQueryService = function (Backend) {

        function getServers() {
            return Backend.get("api/extension/servicenow/servers");
        }

        function executeQuery(widget) {
            return Backend.get("api/extension/servicenow/query?widgetConfigurationId=" +  encodeURIComponent(widget.id));
        }

        return {
            getServers: getServers,
            executeQuery: executeQuery
        };
    };

    ServiceNowQueryService.$inject = ['Backend'];

    angular.module('xlrelease.servicenow.widget', []);
    angular.module('xlrelease.servicenow.widget').service('xlrelease.servicenow.ServiceNowQueryService', ServiceNowQueryService);
    angular.module('xlrelease.servicenow.widget').controller('servicenow.ServiceNowQueryWidgetViewController', ServiceNowQueryWidgetViewController);
    angular.module('xlrelease.servicenow.widget').controller('servicenow.ServiceNowQueryWidgetConfigController', ServiceNowQueryWidgetConfigController);

})();

