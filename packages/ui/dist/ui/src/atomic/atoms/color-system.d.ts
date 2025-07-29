export type HiveColorVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gold' | 'ruby' | 'emerald' | 'sapphire' | 'muted';
export declare const hiveColors: {
    readonly default: {
        readonly bg: "bg-hive-background-secondary";
        readonly text: "text-hive-text-primary";
        readonly border: "border-hive-border-default";
        readonly hover: "hover:bg-hive-background-interactive";
        readonly focus: "focus:border-hive-gold focus:ring-hive-gold/20";
    };
    readonly primary: {
        readonly bg: "bg-[var(--hive-brand-secondary)]";
        readonly text: "text-[var(--hive-background-primary)]";
        readonly border: "border-hive-gold";
        readonly hover: "hover:bg-hive-amber";
        readonly focus: "focus:border-hive-gold focus:ring-hive-gold/20";
    };
    readonly secondary: {
        readonly bg: "bg-hive-background-tertiary";
        readonly text: "text-hive-text-primary";
        readonly border: "border-hive-border-default";
        readonly hover: "hover:bg-hive-background-interactive";
        readonly focus: "focus:border-hive-gold focus:ring-hive-gold/20";
    };
    readonly success: {
        readonly bg: "bg-hive-emerald";
        readonly text: "text-[var(--hive-text-primary)]";
        readonly border: "border-hive-emerald";
        readonly hover: "hover:bg-green-400";
        readonly focus: "focus:border-hive-emerald focus:ring-hive-emerald/20";
    };
    readonly warning: {
        readonly bg: "bg-[var(--hive-brand-secondary)]";
        readonly text: "text-[var(--hive-background-primary)]";
        readonly border: "border-hive-gold";
        readonly hover: "hover:bg-orange-400";
        readonly focus: "focus:border-hive-gold focus:ring-hive-gold/20";
    };
    readonly error: {
        readonly bg: "bg-hive-ruby";
        readonly text: "text-[var(--hive-text-primary)]";
        readonly border: "border-hive-ruby";
        readonly hover: "hover:bg-red-400";
        readonly focus: "focus:border-hive-ruby focus:ring-hive-ruby/20";
    };
    readonly gold: {
        readonly bg: "bg-[var(--hive-brand-secondary)]";
        readonly text: "text-[var(--hive-background-primary)]";
        readonly border: "border-hive-gold";
        readonly hover: "hover:bg-hive-amber";
        readonly focus: "focus:border-hive-gold focus:ring-hive-gold/20";
    };
    readonly ruby: {
        readonly bg: "bg-hive-ruby";
        readonly text: "text-[var(--hive-text-primary)]";
        readonly border: "border-hive-ruby";
        readonly hover: "hover:bg-red-400";
        readonly focus: "focus:border-hive-ruby focus:ring-hive-ruby/20";
    };
    readonly emerald: {
        readonly bg: "bg-hive-emerald";
        readonly text: "text-[var(--hive-text-primary)]";
        readonly border: "border-hive-emerald";
        readonly hover: "hover:bg-green-400";
        readonly focus: "focus:border-hive-emerald focus:ring-hive-emerald/20";
    };
    readonly sapphire: {
        readonly bg: "bg-hive-sapphire";
        readonly text: "text-[var(--hive-text-primary)]";
        readonly border: "border-hive-sapphire";
        readonly hover: "hover:bg-blue-400";
        readonly focus: "focus:border-hive-sapphire focus:ring-hive-sapphire/20";
    };
    readonly muted: {
        readonly bg: "bg-hive-background-tertiary";
        readonly text: "text-hive-text-secondary";
        readonly border: "border-hive-border-subtle";
        readonly hover: "hover:bg-hive-background-interactive";
        readonly focus: "focus:border-hive-gold focus:ring-hive-gold/20";
    };
};
//# sourceMappingURL=color-system.d.ts.map