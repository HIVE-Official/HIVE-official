import { jsx as _jsx } from "react/jsx-runtime";
import { AnalyticsDashboard } from '../../components/analytics-dashboard';
const meta = {
    title: '13-Analytics/Analytics Dashboard',
    component: AnalyticsDashboard,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Real-time analytics dashboard showing system performance, user engagement, and health metrics.',
            },
        },
    },
};
export default meta;
export const Default = {
    name: 'Analytics Dashboard',
    render: () => _jsx(AnalyticsDashboard, {}),
    parameters: {
        docs: {
            description: {
                story: 'The main analytics dashboard showing real-time metrics, performance charts, alerts, and system health status.',
            },
        },
    },
};
//# sourceMappingURL=analytics-dashboard.stories.js.map