#
# THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
# FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
#

import sys, string, time
from servicenow.ServiceNowClientUtil import ServiceNowClientUtil

widgetConfigId = request.query["widgetConfigurationId"]
widgetConfig = repositoryService.read(widgetConfigId)

username = widgetConfig.getProperty("username")
password = widgetConfig.getProperty("password")
table_name = widgetConfig.getProperty("table_name")
servicenow_query = widgetConfig.getProperty("query")
servicenow_server_id = widgetConfig.getProperty("servicenowServer")

if not servicenow_server_id:
    raise Exception("ServiceNow server ID must be provided")

if not table_name:
    raise Exception("ServiceNow Table Name must be provided")

servicenow_server = repositoryService.read(servicenow_server_id)
if not username:
    username = servicenow_server.getProperty("username")
if not password:
    password = servicenow_server.getProperty("password")

servicenow_client = ServiceNowClientUtil.createServiceNowClient(servicenow_server, username, password)
issues = servicenow_client.query_table(table_name, query)

response.entity = issues
