"use client"
import React from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ChevronLeft } from "lucide-react"
import { Button } from '@/components/ui/button';

// Sample data for the chart
const sampleData = [
  { name: 'Jan', users: 200, revenue: 450 },
  { name: 'Feb', users: 350, revenue: 600 },
  { name: 'Mar', users: 300, revenue: 500 },
  { name: 'Apr', users: 400, revenue: 700 },
  { name: 'May', users: 500, revenue: 850 },
  { name: 'Jun', users: 450, revenue: 800 },
];

const AnalyticsPage = () => {
    const [data, setData] = React.useState(sampleData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

  // Simulate fetching data and error handling.
    React.useEffect(() => {
        setLoading(true);
        // In a real application, you would fetch data from an API.
        const fetchData = async () => {
            try {
                // Simulate an API call with a promise.
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate 1.5s delay
                // In a real app, you might do:
                // const response = await fetch('/api/analytics');
                // if (!response.ok) {
                //   throw new Error('Failed to fetch analytics data');
                // }
                // const data = await response.json();
                // setData(data);

                // Simulate some random data fluctuation
                const newData = sampleData.map(item => ({
                    ...item,
                    users: item.users + Math.floor(Math.random() * 100) - 50, // Vary users
                    revenue: item.revenue + Math.floor(Math.random() * 200) - 100, // Vary revenue
                }));
                setData(newData);

                setLoading(false);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching analytics data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Loading analytics data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Link href="/">
                <Button variant="ghost" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
                </Button>
            </Link>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* User Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">User Activity</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">Monthly user trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" name="Users"/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue"/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
