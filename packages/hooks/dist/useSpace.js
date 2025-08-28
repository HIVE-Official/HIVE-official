"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSpace = useSpace;
const react_query_1 = require("@tanstack/react-query");
const api_client_1 = require("@hive/api-client");
function useSpace(spaceId) {
    return (0, react_query_1.useQuery)({
        queryKey: ['space', spaceId],
        queryFn: () => (0, api_client_1.getSpaceById)(spaceId),
        enabled: !!spaceId,
    });
}
//# sourceMappingURL=useSpace.js.map