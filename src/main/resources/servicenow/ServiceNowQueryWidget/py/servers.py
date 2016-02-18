#
# THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
# FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
#

from com.xebialabs.deployit.repository import SearchParameters
from com.xebialabs.deployit.plugin.api.reflect import Type

search_params = SearchParameters()
search_params.type = Type.valueOf("servicenow.Server")

servicenow_servers = repositoryService.listEntities(search_params)
response.entity = [ {"id":s.getId(), "title": s.getProperty("title"), "url": s.getProperty("url")} for s in servicenow_servers ]
