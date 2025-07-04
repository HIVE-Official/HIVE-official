import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";

import { Typography, Heading, Text, Caption, Code } from "../components/typography";

const meta: Meta<typeof Typography> = {
	title: "Design System/Typography",
	component: Typography,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: 'HIVE typography system using Space Grotesk for display text, Geist Sans for body text, and Geist Mono for code.',
			},
		},
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: [
				"display",
				"h1",
				"h2", 
				"h3",
				"h4",
				"body",
				"body-sm",
				"caption",
				"button",
				"label",
				"nav",
				"code",
				"code-block",
				"muted",
				"subtle",
				"small",
				"hero",
				"lead",
			],
		},
		align: {
			control: { type: "select" },
			options: ["left", "center", "right", "justify"],
		},
		weight: {
			control: { type: "select" },
			options: ["light", "normal", "medium", "semibold", "bold"],
		},
		as: {
			control: { type: "text" },
		},
	},
	tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Typography>

// Simple test to see if component loads
export const SimpleTest: Story = {
	args: {
		children: "Hello HIVE Typography!",
	},
}

// === HEADING HIERARCHY ===
export const DisplayHeading: Story = {
	args: {
		variant: "display",
		children: "Welcome to HIVE",
	},
}

export const H1: Story = {
	args: {
		variant: "h1",
		children: "Page Title",
	},
}

export const H2: Story = {
	args: {
		variant: "h2",
		children: "Section Header",
	},
}

export const H3: Story = {
	args: {
		variant: "h3",
		children: "Subsection Header",
	},
}

export const H4: Story = {
	args: {
		variant: "h4",
		children: "Minor Heading",
	},
}

// === BODY TEXT ===
export const BodyText: Story = {
	args: {
		variant: "body",
		children: "This is body text using Geist font. It's perfect for paragraphs, descriptions, and main content areas.",
	},
}

export const BodySmall: Story = {
	args: {
		variant: "body-sm",
		children: "This is smaller body text, great for supporting content and secondary information.",
	},
}

export const Lead: Story = {
	args: {
		variant: "lead",
		children: "This is lead text - larger and muted, perfect for introductory paragraphs that set the context.",
	},
}

// === UI TEXT ===
export const ButtonText: Story = {
	args: {
		variant: "button",
		children: "Get Started",
	},
}

export const LabelText: Story = {
	args: {
		variant: "label",
		children: "Email Address",
	},
}

export const NavigationText: Story = {
	args: {
		variant: "nav",
		children: "Dashboard",
	},
}

export const CaptionText: Story = {
	args: {
		variant: "caption",
		children: "Posted 2 hours ago",
	},
}

// === CODE TEXT ===
export const InlineCode: Story = {
	args: {
		variant: "code",
		children: "npm install @hive/ui",
	},
}

export const CodeBlock: Story = {
	args: {
		variant: "code-block",
		children: `const welcomeUser = (name: string) => {
  return \`Welcome to HIVE, \${name}!\`
}`,
	},
}

// === UTILITY VARIANTS ===
export const MutedText: Story = {
	args: {
		variant: "muted",
		children: "This text is muted and secondary",
	},
}

export const SubtleText: Story = {
	args: {
		variant: "subtle",
		children: "Very subtle text for metadata",
	},
}

export const SmallText: Story = {
	args: {
		variant: "small",
		children: "Small text for fine print",
	},
}

// === ALIGNMENT OPTIONS ===
export const TextAlignment: Story = {
	render: () => (
		<div className="w-96 space-y-4">
			<Typography variant="body" align="left">Left aligned text</Typography>
			<Typography variant="body" align="center">Center aligned text</Typography>
			<Typography variant="body" align="right">Right aligned text</Typography>
			<Typography variant="body" align="justify">
				Justified text that spreads across the full width of the container,
				creating even spacing between words.
			</Typography>
		</div>
	),
}

// === FONT WEIGHT OPTIONS ===
export const FontWeights: Story = {
	render: () => (
		<div className="space-y-2">
			<Typography variant="body" weight="light">Light weight text</Typography>
			<Typography variant="body" weight="normal">Normal weight text</Typography>
			<Typography variant="body" weight="medium">Medium weight text</Typography>
			<Typography variant="body" weight="semibold">Semibold weight text</Typography>
			<Typography variant="body" weight="bold">Bold weight text</Typography>
		</div>
	),
}

// === CONVENIENCE COMPONENTS ===
export const ConvenienceComponents: Story = {
	render: () => (
		<div className="space-y-4">
			<Heading level={1}>Heading Component (Level 1)</Heading>
			<Heading level={2}>Heading Component (Level 2)</Heading>
			<Text>Text Component (Body)</Text>
			<Caption>Caption Component</Caption>
			<Code>Inline Code Component</Code>
			<Code block>Block Code Component</Code>
		</div>
	),
}

// === FONT FAMILY SHOWCASE ===
export const FontFamilyShowcase: Story = {
	render: () => (
		<div className="space-y-6 max-w-2xl">
			<div>
				<Typography variant="h3" className="mb-2">Space Grotesk Variable (Display)</Typography>
				<Typography variant="display" className="mb-2">The Future of Social</Typography>
				<Typography variant="h1">Welcome to HIVE</Typography>
				<Typography variant="h2">Connect & Collaborate</Typography>
				<Typography variant="h3">Build Your Network</Typography>
				<Typography variant="h4">Share Your Story</Typography>
			</div>
			
			<div>
				<Typography variant="h3" className="mb-2">Geist (Body & UI)</Typography>
				<Typography variant="body" className="mb-2">
					HIVE is a social platform designed for creators, innovators, and communities 
					who want to connect in meaningful ways. Built with privacy and authenticity at its core.
				</Typography>
				<Typography variant="body-sm" className="mb-2">
					Join thousands of users who are already building the future together.
				</Typography>
				<Typography variant="caption">Last updated: 5 minutes ago</Typography>
			</div>
			
			<div>
				<Typography variant="h3" className="mb-2">Geist Mono (Code)</Typography>
				<Code>const platform = &quot;HIVE&quot;</Code>
				<Code block className="mt-2">
{`function createPost(content: string) {
  return {
    id: generateId(),
    content,
    timestamp: Date.now(),
    author: getCurrentUser()
  }
}`}
				</Code>
			</div>
		</div>
	),
}

// === COMPREHENSIVE SHOWCASE ===
export const AllVariants: Story = {
	render: () => (
		<div className="space-y-4 max-w-4xl">
			<Typography variant="display">Display</Typography>
			<Typography variant="h1">Heading 1</Typography>
			<Typography variant="h2">Heading 2</Typography>
			<Typography variant="h3">Heading 3</Typography>
			<Typography variant="h4">Heading 4</Typography>
			<Typography variant="body">Body text</Typography>
			<Typography variant="body-sm">Body small</Typography>
			<Typography variant="lead">Lead text</Typography>
			<Typography variant="button">Button text</Typography>
			<Typography variant="label">Label text</Typography>
			<Typography variant="nav">Navigation text</Typography>
			<Typography variant="caption">Caption text</Typography>
			<Typography variant="code">Inline code</Typography>
			<Typography variant="muted">Muted text</Typography>
			<Typography variant="subtle">Subtle text</Typography>
			<Typography variant="small">Small text</Typography>
		</div>
	),
}

// === REAL-WORLD EXAMPLES ===
export const ArticleExample: Story = {
	render: () => (
		<article className="max-w-2xl space-y-4">
			<Typography variant="h1">Building the Future of Social Media</Typography>
			<Typography variant="lead">
				How HIVE is reimagining online communities with privacy, authenticity, and meaningful connections.
			</Typography>
			<Typography variant="caption">Published by Sarah Chen • 5 min read</Typography>
			
			<Typography variant="body">
				In an era where social media platforms prioritize engagement over authenticity, 
				HIVE emerges as a breath of fresh air. Built from the ground up with user privacy 
				and genuine connections in mind.
			</Typography>
			
			<Typography variant="h2">The Problem with Current Platforms</Typography>
			<Typography variant="body">
				Traditional social media platforms have become echo chambers, designed to keep users 
				scrolling rather than connecting. The algorithm-driven feeds promote divisive content 
				and superficial interactions.
			</Typography>
			
			<Code block>
{`// HIVE's approach to content discovery
const discoverContent = (user: User) => {
  return fetchContent({
    interests: user.genuineInterests,
    connections: user.meaningfulConnections,
    algorithmic: false
  })
}`}
			</Code>
			
			<Typography variant="muted">
				Learn more about our approach to ethical social media design.
			</Typography>
		</article>
	),
};

// === GROCERY STORE SHOWCASE ===
export const GroceryShowcase: Story = {
	name: "🛒 Typography Grocery Store",
	render: () => (
		<div className="space-y-8 p-8">
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-white">HIVE Typography Grocery Store</h2>
				<p className="text-gray-400">Pick your perfect text variant</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{/* Display & Headlines - Space Grotesk */}
				<div className="space-y-4 p-6 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white mb-4">Display & Headlines</h3>
					<div className="space-y-3">
						<div>
							<Typography variant="small" className="text-muted mb-1">Display</Typography>
							<Typography variant="display">Welcome to HIVE</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">H1</Typography>
							<Typography variant="h1">Page Title</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">H2</Typography>
							<Typography variant="h2">Section Header</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">H3</Typography>
							<Typography variant="h3">Subsection</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">H4</Typography>
							<Typography variant="h4">Minor Heading</Typography>
						</div>
					</div>
				</div>

				{/* Body Text - Geist Sans */}
				<div className="space-y-4 p-6 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white mb-4">Body Text</h3>
					<div className="space-y-3">
						<div>
							<Typography variant="small" className="text-muted mb-1">Lead</Typography>
							<Typography variant="lead">Large introductory text</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Body</Typography>
							<Typography variant="body">Standard paragraph text</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Body Small</Typography>
							<Typography variant="body-sm">Smaller supporting text</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Caption</Typography>
							<Typography variant="caption">Metadata and timestamps</Typography>
						</div>
					</div>
				</div>

				{/* UI Elements - Geist Sans */}
				<div className="space-y-4 p-6 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white mb-4">UI Elements</h3>
					<div className="space-y-3">
						<div>
							<Typography variant="small" className="text-muted mb-1">Button</Typography>
							<Typography variant="button">Get Started</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Label</Typography>
							<Typography variant="label">Form Label</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Navigation</Typography>
							<Typography variant="nav">Dashboard</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Small</Typography>
							<Typography variant="small">Fine print text</Typography>
						</div>
					</div>
				</div>

				{/* Code Text - Geist Mono */}
				<div className="space-y-4 p-6 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white mb-4">Code & Data</h3>
					<div className="space-y-3">
						<div>
							<Typography variant="small" className="text-muted mb-1">Inline Code</Typography>
							<Typography variant="code">npm install</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Code Block</Typography>
							<Typography variant="code-block" className="text-xs">
								{`const hello = "world";`}
							</Typography>
						</div>
					</div>
				</div>

				{/* Utility Variants */}
				<div className="space-y-4 p-6 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white mb-4">Utility Text</h3>
					<div className="space-y-3">
						<div>
							<Typography variant="small" className="text-muted mb-1">Muted</Typography>
							<Typography variant="muted">Secondary information</Typography>
						</div>
						<div>
							<Typography variant="small" className="text-muted mb-1">Subtle</Typography>
							<Typography variant="subtle">Very light metadata</Typography>
						</div>
					</div>
				</div>

				{/* Weight Variations */}
				<div className="space-y-4 p-6 bg-gray-900 rounded-lg">
					<h3 className="text-lg font-semibold text-white mb-4">Font Weights</h3>
					<div className="space-y-3">
						<Typography variant="body" weight="light">Light (300)</Typography>
						<Typography variant="body" weight="normal">Normal (400)</Typography>
						<Typography variant="body" weight="medium">Medium (500)</Typography>
						<Typography variant="body" weight="semibold">Semibold (600)</Typography>
						<Typography variant="body" weight="bold">Bold (700)</Typography>
					</div>
				</div>
			</div>

			{/* Campus Typography Examples */}
			<div className="space-y-6">
				<h3 className="text-xl font-semibold text-white text-center">Campus Content Examples</h3>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Event Card Typography */}
					<div className="p-6 bg-gray-900 rounded-lg space-y-3">
						<Typography variant="h3">Study Group Tonight</Typography>
						<Typography variant="body-sm" className="text-muted">Computer Science 101</Typography>
						<Typography variant="body">
							Join us for collaborative problem-solving and exam prep in the library.
						</Typography>
						<Typography variant="caption">Posted 2 hours ago • 12 attending</Typography>
					</div>

					{/* Achievement Typography */}
					<div className="p-6 bg-gray-900 rounded-lg space-y-3">
						<Typography variant="h3" className="text-accent">Achievement Unlocked!</Typography>
						<Typography variant="body" weight="semibold">7-Day Study Streak</Typography>
						<Typography variant="body-sm">
							You've maintained consistent study habits for a full week.
						</Typography>
						<Typography variant="caption" className="text-accent">
							+50 XP earned
						</Typography>
					</div>

					{/* Course Info Typography */}
					<div className="p-6 bg-gray-900 rounded-lg space-y-3">
						<Typography variant="h3">Psychology 101</Typography>
						<Typography variant="body" className="text-muted">Prof. Johnson • MWF 10:00 AM</Typography>
						<Typography variant="body-sm">
							Introduction to psychological principles and research methods.
						</Typography>
						<Typography variant="small">Progress: 75% complete</Typography>
					</div>

					{/* Social Post Typography */}
					<div className="p-6 bg-gray-900 rounded-lg space-y-3">
						<Typography variant="body" weight="semibold">@sarah_studies</Typography>
						<Typography variant="body">
							Just finished my midterm prep! The campus coffee shop was perfect ☕️
						</Typography>
						<Typography variant="caption" className="text-muted">
							2 hours ago • 24 likes • 5 comments
						</Typography>
					</div>
				</div>
			</div>

			<div className="text-center pt-8 border-t border-gray-800">
				<p className="text-gray-400 text-sm">
					🎨 Following HIVE Design System - Space Grotesk for display, Geist for UI, Geist Mono for code
				</p>
			</div>
		</div>
	),
}; 