import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../atomic/atoms/table";

const meta = {
  title: "11-Shared/Table",
  component: Table,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const ProductionShowcase: Story = {
  render: () => (
    <div className="w-full space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button className="text-sm text-primary transition-smooth ease-liquid hover:underline">View all</button>
      </div>
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "TXN-001", date: "2025-01-15", status: "Completed", amount: "$1,250.00" },
              { id: "TXN-002", date: "2025-01-14", status: "Processing", amount: "$450.00" },
              { id: "TXN-003", date: "2025-01-13", status: "Completed", amount: "$3,200.00" },
            ].map((txn) => (
              <TableRow key={txn.id} className="transition-smooth ease-liquid hover:bg-muted/50">
                <TableCell className="font-medium">{txn.id}</TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${txn.status === "Completed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                    {txn.status}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold">{txn.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};
