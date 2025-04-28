'use client';

import { HStack } from '@chakra-ui/react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from "ag-charts-community";

import { Vulnerability } from '@/lib/api';
import { useMemo } from 'react';

interface VulnerabilitiesChartsProps {
  vulnerabilities?: Vulnerability[];
}

const COLORS = ['#38A169', '#D69E2E', '#E53E3E', '#DD6B20', '#3182CE', '#805AD5', '#ECC94B', '#F56565'];

const AgBoxPie = ({ title, data }: { title: string, data: { name: string; value: number }[] }) => {
  const options: AgChartOptions = useMemo(() => ({
    data,
    title: {
      text: title,
    },
    series: [
      {
        type: "pie",
        angleKey: "value",
        legendItemKey: "name",
        fills: COLORS
      },
    ],
    background: {
      fill: "transparent",
    },
  }), []);

  return (
    <AgCharts style={{ width: '100%' }} options={options} />
  );
}

export default function VulnerabilitiesCharts({ vulnerabilities = [] }: VulnerabilitiesChartsProps) {
  const counts = vulnerabilities.reduce((acc, vuln) => {
    acc[`severity.${vuln.severity}`] = (acc[`severity.${vuln.severity}`] || 0) + 1;
    acc[`status.${vuln.status}`] = (acc[`status.${vuln.status}`] || 0) + 1;
    acc[`category.${vuln.category}`] = (acc[`category.${vuln.category}`] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const prepareData = (prefix: string) => {
    return Object.entries(counts)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => ({
        name: key.replace(`${prefix}.`, '').replace(/-/g, ' '),
        value,
      }));
  };

  const severityData = prepareData('severity');
  const statusData = prepareData('status');
  const categoryData = prepareData('category');

  return (
    <HStack flexWrap="wrap">
      <AgBoxPie title='Severity Breakdown' data={severityData} />
      <AgBoxPie title='Status Breakdown' data={statusData} />
      <AgBoxPie title='Category Breakdown' data={categoryData} />
    </HStack>
  );
}
