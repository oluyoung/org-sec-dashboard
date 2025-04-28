'use client';
import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function DashboardCharts({ chartData, refreshData }: { chartData: { name: string; value: number }[]; refreshData: () => void }) {
  return (
    <Box bg="black" p="6" borderRadius="md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Bar dataKey="value" fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default memo(DashboardCharts);
