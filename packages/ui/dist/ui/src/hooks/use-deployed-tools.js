/**
 * Hook for fetching deployed tools for a space
 */
import { useState, useEffect } from 'react';
export function useDeployedTools(spaceId) {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!spaceId) {
            setLoading(false);
            return;
        }
        let isMounted = true;
        const fetchDeployedTools = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch widget data which includes deployed tools
                const response = await fetch(`/api/spaces/${spaceId}/widgets`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch deployed tools: ${response.status}`);
                }
                const data = await response.json();
                if (isMounted) {
                    // Extract tools from widget data
                    const toolsData = data.widgets?.tools;
                    if (toolsData && toolsData.available) {
                        setTools(toolsData.available);
                    }
                    else {
                        setTools([]);
                    }
                }
            }
            catch (err) {
                console.error('Error fetching deployed tools:', err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch deployed tools');
                    setTools([]);
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchDeployedTools();
        return () => {
            isMounted = false;
        };
    }, [spaceId]);
    return { tools, loading, error };
}
//# sourceMappingURL=use-deployed-tools.js.map