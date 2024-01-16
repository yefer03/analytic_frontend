import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const GraphServiceComponent = ({ data }) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="nombre_servicio" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad_servicios_vendidos" fill="#6b48ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
