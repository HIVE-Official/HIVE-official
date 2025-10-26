// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "../index";

const meta: Meta = { title: "Molecules/Pagination" };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination page={page} pageCount={7} onPageChange={setPage} />;
  }
};

