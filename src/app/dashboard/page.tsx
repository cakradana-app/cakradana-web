'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  User,
  Home,
  Network,
  FileText,
  AlertTriangle,
  Upload,
  Users,
  BarChart3,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

declare global {
  interface Window {
    Chart: any;
  }
}

const Page = () => {
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const [chartsLoaded, setChartsLoaded] = useState(false);

  const recentDonations = [
    {
      donor: "Citra Wijaya",
      donorType: "Individual",
      recipient: "Ganjar Pranowo",
      amount: "Rp 196.541.744",
      risk: "Low",
    },
    {
      donor: "Eko Prasetyo",
      donorType: "Individual",
      recipient: "Ganjar Pranowo",
      amount: "Rp 96.535.744",
      risk: "High",
    },
    {
      donor: "PT Maju Jaya",
      donorType: "Company",
      recipient: "Prabowo Subianto",
      amount: "Rp 396.405.204",
      risk: "Low",
    },
    {
      donor: "Partai Kemajuan Rakyat",
      donorType: "Party",
      recipient: "Prabowo Subianto",
      amount: "Rp 26.400.000",
      risk: "Medium",
    },
    {
      donor: "Partai Persatuan Indonesia",
      donorType: "Party",
      recipient: "Anies Baswedan",
      amount: "Rp 111.111.111",
      risk: "High",
    },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    script.onload = () => {
      setChartsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (chartsLoaded && doughnutChartRef.current && lineChartRef.current) {
      const doughnutCtx = doughnutChartRef.current.getContext('2d');
      new window.Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Low Risk', 'Medium Risk', 'High Risk'],
          datasets: [{
            data: [60, 30, 10],
            backgroundColor: [
              '#10B981',
              '#F59E0B',
              '#EF4444' 
            ],
            borderWidth: 0,
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      const lineCtx = lineChartRef.current.getContext('2d');
      new window.Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3'],
          datasets: [
            {
              label: 'Low Risk',
              data: [5, 7, 15],
              borderColor: '#10B981',
              backgroundColor: '#10B981',
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#10B981'
            },
            {
              label: 'Medium Risk',
              data: [3, 5, 12],
              borderColor: '#F59E0B',
              backgroundColor: '#F59E0B',
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#F59E0B'
            },
            {
              label: 'High Risk',
              data: [4, 6, 11],
              borderColor: '#EF4444',
              backgroundColor: '#EF4444',
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#EF4444'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: true,
                color: '#f3f4f6'
              },
              ticks: {
                color: '#6b7280'
              }
            },
            y: {
              display: true,
              grid: {
                display: true,
                color: '#f3f4f6'
              },
              ticks: {
                color: '#6b7280',
                callback: function(value: any) {
                  return value + 'M';
                }
              },
              min: 0,
              max: 20
            }
          }
        }
      });
    }
  }, [chartsLoaded]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Overview of election financing data and risk metrics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Donations</p>
                      <p className="text-xl font-bold">651</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12.3%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total amount</p>
                      <p className="text-xl font-bold">Rp 101,097,521,889</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+8.2%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        High Risk Transactions
                      </p>
                      <p className="text-xl font-bold">26</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-600">-2.1%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Pending Confirmations
                      </p>
                      <p className="text-xl font-bold">5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">
                  Risk Score Distribution
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Current distribution of donation risk scores
                </p>

                <div className="relative h-64 mb-6">
                  <canvas ref={doughnutChartRef}></canvas>
                </div>

                <div className="flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Low Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">High Risk</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-6">Donation Trends</h3>
                
                <div className="relative h-64 mb-4">
                  <canvas ref={lineChartRef}></canvas>
                </div>

                <div className="flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Low Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">High Risk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Donations</h3>
                <p className="text-sm text-gray-600">
                  Most recent donation transactions
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DONOR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RECIPIENT
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AMOUNT
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RISK
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDonations.map((donation, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {donation.donor}
                            </div>
                            <div className="text-sm text-gray-500">
                              {donation.donorType}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {donation.recipient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {donation.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(
                              donation.risk
                            )}`}
                          >
                            {donation.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all donations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;