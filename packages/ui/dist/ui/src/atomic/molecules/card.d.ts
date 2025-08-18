import React from 'react';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'glass' | 'interactive' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg' | 'xl';
    hoverable?: boolean;
    children: React.ReactNode;
}
export declare const Card: React.FC<CardProps>;
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare const CardHeader: React.FC<CardHeaderProps>;
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare const CardContent: React.FC<CardContentProps>;
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
export declare const CardTitle: React.FC<CardTitleProps>;
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare const CardFooter: React.FC<CardFooterProps>;
//# sourceMappingURL=card.d.ts.map