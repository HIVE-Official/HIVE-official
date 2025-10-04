import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';

const meta = {
  title: 'Atoms/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#000000' }] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-white">Name</Label>
            <Input id="name" defaultValue="Sarah Johnson" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-white">Username</Label>
            <Input id="username" defaultValue="@sarahj" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Space</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the space
            "CS Study Group" and remove all posts and members.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Yes, delete space</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const CreateSpaceDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="gold">Create Space</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a new space</DialogTitle>
          <DialogDescription>
            Spaces are communities where students can connect around shared interests.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="space-name" className="text-white">Space name</Label>
            <Input id="space-name" placeholder="e.g., CS Study Group" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Input id="description" placeholder="What's this space about?" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-white">Category</Label>
            <Input id="category" placeholder="e.g., Academics, Social, Sports" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="gold">Create space</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SuccessDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show Success</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-[#FFD700]">✓</span> Profile updated successfully
          </DialogTitle>
          <DialogDescription>
            Your changes are now visible to other students on campus.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};