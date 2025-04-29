'use client';

import { useMemo } from 'react';
import { HStack } from '@chakra-ui/react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from "ag-charts-community";

import { Vulnerability } from '@/lib/api';
import EmptyComponent from './EmptyComponent';

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
  const { severityData, statusData, categoryData } = useMemo(() => vulnerabilities.reduce(
    (acc, vuln) => {
      const severityIndex = acc.severityData.findIndex(item => item.name === vuln.severity);
      if (severityIndex >= 0) {
        acc.severityData[severityIndex].value += 1;
      } else {
        acc.severityData.push({ name: vuln.severity, value: 1 });
      }

      const statusIndex = acc.statusData.findIndex(item => item.name === vuln.status);
      if (statusIndex >= 0) {
        acc.statusData[statusIndex].value += 1;
      } else {
        acc.statusData.push({ name: vuln.status, value: 1 });
      }

      const categoryIndex = acc.categoryData.findIndex(item => item.name === vuln.category);
      if (categoryIndex >= 0) {
        acc.categoryData[categoryIndex].value += 1;
      } else {
        acc.categoryData.push({ name: vuln.category, value: 1 });
      }
  
      return acc;
    },
    {
      severityData: [] as { name: string; value: number }[],
      statusData: [] as { name: string; value: number }[],
      categoryData: [] as { name: string; value: number }[],
    }
  ), [vulnerabilities]);

  if (!vulnerabilities.length) return <EmptyComponent message='No vulnerabilities have been reported' />

  return (
    <HStack flexWrap="wrap">
      <AgBoxPie title='Severity Breakdown' data={severityData} />
      <AgBoxPie title='Status Breakdown' data={statusData} />
      <AgBoxPie title='Category Breakdown' data={categoryData} />
    </HStack>
  );
}
