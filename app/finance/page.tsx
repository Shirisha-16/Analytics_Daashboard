// If using the app directory: app/finance/page.tsx
import React from 'react';
import {DashboardLayout} from '@/components/dashboard-layout';
import { FinanceSection } from '@/components/finance/finance-section'; // Assuming the path is correct

const FinancePage = () => {
  return (
    <DashboardLayout>
      <div>
        <FinanceSection />
      </div>
    </DashboardLayout>
  );
};

export default FinancePage;