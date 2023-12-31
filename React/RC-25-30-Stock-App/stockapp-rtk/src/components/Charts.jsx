import { AreaChart, Card, Title } from "@tremor/react";
import Grid from "@mui/material/Grid";
import { useGetStocksQuery } from "../services/stocks";
import Loading from "./Loading";

const dataFormatter = (number) =>
  `€${Intl.NumberFormat("us").format(number).toString()}`;

const Charts = () => {
  const { data: purchases } = useGetStocksQuery("purchases");
  const { data: sales, isLoading } = useGetStocksQuery("sales");

  const salesData = sales?.map((item) => ({
    date: new Date(item.createdAt).toLocaleString("de-DE"),
    sale: Number(item.amount),
  }));

  const purchasesData = purchases?.map((item) => ({
    date: new Date(item.createdAt).toLocaleString("de-DE"),
    purchase: Number(item.amount),
  }));
  if (isLoading) return <Loading />;
  return (
    <Grid container justifyContent="center" mt={2} spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <Title>Sales</Title>

          <AreaChart
            className="h-72 mt-4"
            data={salesData}
            index="date"
            categories={["sale"]}
            colors={["lime"]}
            yAxisWidth={50}
            valueFormatter={dataFormatter}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <Title>Purchases</Title>
          <AreaChart
            className="h-72 mt-4"
            data={purchasesData}
            index="date"
            categories={["purchase"]}
            colors={["amber"]}
            yAxisWidth={50}
            valueFormatter={dataFormatter}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
export default Charts;
