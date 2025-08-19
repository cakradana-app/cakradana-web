'use client';
import React from "react";
import DashboardLayout, { DashboardContent } from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;