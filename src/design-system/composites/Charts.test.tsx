import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BarChart, ColumnChart, DonutChart, LineChart, niceMax } from "./Charts";

const series = [{ name: "Antes", values: [10, 20] }, { name: "Depois", values: [5, 15] }];

describe("charts (LOOP-CMP-024…029)", () => {
  it("rounds the axis maximum to a readable value", () => {
    expect(niceMax(117)).toBe(200);
    expect(niceMax(21)).toBe(25);
    expect(niceMax(4)).toBe(5);
    expect(niceMax(0)).toBe(1);
  });
  it("column chart exposes a captioned figure and a data table", () => {
    render(<ColumnChart title="Horas" labels={["Jan", "Fev"]} series={series} unit="h" />);
    const fig = screen.getByRole("figure", { name: "Horas" });
    const table = within(fig).getByRole("table", { name: "Horas" });
    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(within(table).getByRole("rowheader", { name: "Jan" })).toBeInTheDocument();
    expect(within(table).getByText("15h")).toBeInTheDocument();
    expect(fig.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
  it("rejects more than 6 series", () => {
    const many = Array.from({ length: 7 }, (_, i) => ({ name: `S${i}`, values: [1] }));
    expect(() => render(<LineChart title="x" labels={["a"]} series={many} />)).toThrow(/at most 6/);
  });
  it("bar and donut charts list every item in the table", () => {
    const items = [{ name: "A", value: 3 }, { name: "B", value: 7 }];
    render(<BarChart title="Barras" items={items} />);
    render(<DonutChart title="Rosca" items={items} unit="%" />);
    expect(within(screen.getByRole("table", { name: "Barras" })).getAllByRole("rowheader")).toHaveLength(2);
    expect(within(screen.getByRole("table", { name: "Rosca" })).getByText("7%")).toBeInTheDocument();
  });
});
