import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Employee } from '@/types/employee';
import { calculatePercentage, calculateRating, getRatingColor } from '@/utils/calculations';
import StatsCards from '@/components/dashboard/StatsCards';
import OverviewCharts from '@/components/dashboard/OverviewCharts';
import EmployeeCard from '@/components/dashboard/EmployeeCard';
import AnalyticsTable from '@/components/dashboard/AnalyticsTable';
import AddEmployeeForm from '@/components/dashboard/AddEmployeeForm';
import EmployeeDetailsDialog from '@/components/dashboard/EmployeeDetailsDialog';

const Dashboard = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Иванов Иван',
      plan: 80000,
      fact: 72000,
      percentage: 90,
      rating: 5,
      additionalMetrics: [
        { id: 'a1', name: 'Новые клиенты', plan: 20, fact: 18, percentage: 90 },
        { id: 'a2', name: 'Повторные продажи', plan: 50, fact: 45, percentage: 90 }
      ],
      perishableProducts: [
        {
          id: 'p1',
          tableName: 'Молочные продукты',
          totalPercentage: 85,
          items: [
            { id: 'i1', name: 'Молоко', plan: 100, fact: 90, percentage: 90 },
            { id: 'i2', name: 'Творог', plan: 80, fact: 70, percentage: 87.5 },
            { id: 'i3', name: 'Сметана', plan: 60, fact: 45, percentage: 75 }
          ]
        }
      ],
      urgentSales: [
        {
          id: 's1',
          tableName: 'Акционные товары',
          totalPercentage: 88,
          items: [
            { id: 'si1', name: 'Товар А', plan: 200, fact: 180, percentage: 90 },
            { id: 'si2', name: 'Товар Б', plan: 150, fact: 135, percentage: 90 },
            { id: 'si3', name: 'Товар В', plan: 100, fact: 80, percentage: 80 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Петрова Анна',
      plan: 75000,
      fact: 45000,
      percentage: 60,
      rating: 3,
      additionalMetrics: [
        { id: 'a3', name: 'Новые клиенты', plan: 15, fact: 10, percentage: 66.7 },
        { id: 'a4', name: 'Повторные продажи', plan: 40, fact: 22, percentage: 55 }
      ],
      perishableProducts: [],
      urgentSales: []
    },
    {
      id: '3',
      name: 'Сидоров Петр',
      plan: 90000,
      fact: 30000,
      percentage: 33.3,
      rating: 1,
      additionalMetrics: [
        { id: 'a5', name: 'Новые клиенты', plan: 25, fact: 8, percentage: 32 },
        { id: 'a6', name: 'Повторные продажи', plan: 60, fact: 20, percentage: 33.3 }
      ],
      perishableProducts: [],
      urgentSales: []
    }
  ]);

  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newPlan, setNewPlan] = useState('');
  const [newFact, setNewFact] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailsDialogOpen(true);
  };

  const addEmployee = () => {
    if (!newEmployeeName || !newPlan || !newFact) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const plan = parseFloat(newPlan);
    const fact = parseFloat(newFact);
    const percentage = calculatePercentage(fact, plan);
    const rating = calculateRating(percentage);

    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: newEmployeeName,
      plan,
      fact,
      percentage,
      rating,
      additionalMetrics: [],
      perishableProducts: [],
      urgentSales: []
    };

    setEmployees([...employees, newEmployee]);
    setNewEmployeeName('');
    setNewPlan('');
    setNewFact('');

    toast({
      title: 'Сотрудник добавлен',
      description: `${newEmployeeName} успешно добавлен в систему`
    });
  };

  const getTotalStats = () => {
    const totalPlan = employees.reduce((sum, emp) => sum + emp.plan, 0);
    const totalFact = employees.reduce((sum, emp) => sum + emp.fact, 0);
    const avgPercentage = employees.length > 0 
      ? employees.reduce((sum, emp) => sum + emp.percentage, 0) / employees.length 
      : 0;
    const avgRating = employees.length > 0
      ? employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length
      : 0;

    return { totalPlan, totalFact, avgPercentage, avgRating };
  };

  const stats = getTotalStats();

  const chartData = employees.map(emp => ({
    name: emp.name.split(' ')[0],
    план: emp.plan,
    факт: emp.fact,
    процент: emp.percentage.toFixed(1)
  }));

  const ratingDistribution = [0, 1, 2, 3, 4, 5].map(rating => ({
    name: `Оценка ${rating}`,
    value: employees.filter(emp => emp.rating === rating).length,
    color: getRatingColor(rating)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Система оценки эффективности</h1>
            <p className="text-slate-600">Автоматический расчет и анализ выполнения плана</p>
          </div>
          <Button size="lg" className="gap-2">
            <Icon name="Download" size={20} />
            Скачать PDF отчет
          </Button>
        </div>

        <StatsCards stats={stats} />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="employees" className="gap-2">
              <Icon name="Users" size={16} />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <Icon name="Plus" size={16} />
              Добавить
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewCharts chartData={chartData} ratingDistribution={ratingDistribution} />
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <EmployeeCard 
                  key={employee.id} 
                  employee={employee} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTable employees={employees} />
          </TabsContent>

          <TabsContent value="add">
            <AddEmployeeForm
              newEmployeeName={newEmployeeName}
              setNewEmployeeName={setNewEmployeeName}
              newPlan={newPlan}
              setNewPlan={setNewPlan}
              newFact={newFact}
              setNewFact={setNewFact}
              onAddEmployee={addEmployee}
            />
          </TabsContent>
        </Tabs>

        <EmployeeDetailsDialog
          employee={selectedEmployee}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
      </div>
    </div>
  );
};

export default Dashboard;