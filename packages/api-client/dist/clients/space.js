export async function getSpaceById(spaceId) {
    const response = await fetch(`/api/spaces/${spaceId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch space');
    }
    return response.json();
}
export async function getSpacesByType(type) {
    const response = await fetch(`/api/spaces?type=${type}`);
    if (!response.ok) {
        throw new Error('Failed to fetch spaces');
    }
    return response.json();
}
export async function verifySpaceLeadership(spaceId, emails) {
    const response = await fetch(`/api/spaces/${spaceId}/verify-leadership`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails }),
    });
    if (!response.ok) {
        throw new Error('Failed to verify leadership');
    }
}
//# sourceMappingURL=space.js.map