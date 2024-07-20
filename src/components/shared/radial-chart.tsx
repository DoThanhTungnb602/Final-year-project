"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "~/components/ui/chart";

const chartConfig = {} satisfies ChartConfig;

interface RadialChartData {
  solved: number;
  total: number;
  fill: string;
}

export function RadialChart({ chartData }: { chartData: RadialChartData[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-square h-52">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={Math.round(
          (chartData[0]!.solved / chartData[0]!.total) * 360,
        )}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="total" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {`${chartData[0]!.solved.toLocaleString()}/${chartData[0]!.total.toLocaleString()}`}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Solved
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
