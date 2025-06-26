// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react"

import { Typography, Heading, Text, Caption, Code } from "../components/typography"

const meta: Meta<typeof Typography> = {
	title: "UI/Typography",
	component: Typography,
	parameters: {
		layout: "centered",
		backgrounds: {
			default: "dark",
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
} 