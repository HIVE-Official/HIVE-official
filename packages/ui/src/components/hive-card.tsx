// Re-export atomic card components as HiveCard components
export { 
  Card as HiveCard,
  CardHeader as HiveCardHeader,
  CardTitle as HiveCardTitle,
  CardContent as HiveCardContent,
  CardFooter as HiveCardFooter,
  CardDescription as HiveCardDescription
} from '../atomic/ui/card';

export { cardVariants as hiveCardVariants } from '../atomic/ui/card';
export type { CardProps as HiveCardProps } from '../atomic/ui/card';