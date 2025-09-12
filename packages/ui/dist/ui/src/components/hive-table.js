import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
export const HiveTable = ({ className, ...props }) => {
    return (_jsx("div", { className: "relative w-full overflow-auto", children: _jsx("table", { className: cn('w-full caption-bottom text-sm', className), ...props }) }));
};
export const HiveTableHeader = ({ className, ...props }) => (_jsx("thead", { className: cn('[&_tr]:border-b', className), ...props }));
export const HiveTableBody = ({ className, ...props }) => (_jsx("tbody", { className: cn('[&_tr:last-child]:border-0', className), ...props }));
export const HiveTableRow = ({ className, ...props }) => (_jsx("tr", { className: cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className), ...props }));
export const HiveTableHead = ({ className, ...props }) => (_jsx("th", { className: cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className), ...props }));
export const HiveTableCell = ({ className, ...props }) => (_jsx("td", { className: cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className), ...props }));
export const hiveTableVariants = {};
//# sourceMappingURL=hive-table.js.map