import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../atomic/atoms/carousel";
import { Card, CardContent } from "../../atomic/atoms/card";

const meta = {
  title: "11-Shared/Carousel",
  component: Carousel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="transition-all duration-smooth ease-liquid hover:shadow-lg">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {["Abstract", "Landscape", "Portrait", "Nature", "Architecture"].map((category, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="transition-all duration-smooth ease-liquid hover:shadow-lg">
                <CardContent className="flex aspect-video items-center justify-center p-6 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="text-center">
                    <div className="text-2xl font-semibold">{category}</div>
                    <div className="text-sm text-muted-foreground">Category {index + 1}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const ThreePerView: Story = {
  render: () => (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
            <div className="p-1">
              <Card className="transition-all duration-smooth ease-liquid hover:shadow-lg hover:scale-105">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
