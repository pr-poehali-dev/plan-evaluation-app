import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Employee {
  id: string;
  name: string;
  plan: number;
  fact: number;
  percentage: number;
  rating: number;
  additionalMetrics: AdditionalMetric[];
  perishableProducts: ProductTable[];
  urgentSales: ProductTable[];
}

interface AdditionalMetric {
  id: string;
  name: string;
  plan: number;
  fact: number;
  percentage: number;
}

interface ProductTable {
  id: string;
  tableName: string;
  items: ProductItem[];
  totalPercentage: number;
}

interface ProductItem {
  id: string;
  name: string;
  plan: number;
  fact: number;
  percentage: number;
}

const calculatePercentage = (fact: number, plan: number): number => {
  if (plan === 0) return 0;
  return (fact / plan) * 100;
};

const calculateRating = (percentage: number): number => {
  if (percentage <= 10) return 0;
  if (percentage <= 35) return 1;
  if (percentage <= 50) return 2;
  if (percentage <= 65) return 3;
  if (percentage <= 79) return 4;
  return 5;
};

const getRatingColor = (rating: number): string => {
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];
  return colors[rating] || '#6b7280';
};

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
  const [additionalPercentageDistribution, setAdditionalPercentageDistribution] = useState(1);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500 hover-scale">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Target" size={16} />
                Общий план
              </CardDescription>
              <CardTitle className="text-3xl">{stats.totalPlan.toLocaleString()} ₽</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover-scale">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} />
                Выполнено
              </CardDescription>
              <CardTitle className="text-3xl">{stats.totalFact.toLocaleString()} ₽</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover-scale">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Percent" size={16} />
                Средний процент
              </CardDescription>
              <CardTitle className="text-3xl">{stats.avgPercentage.toFixed(1)}%</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover-scale">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Star" size={16} />
                Средняя оценка
              </CardDescription>
              <CardTitle className="text-3xl">{stats.avgRating.toFixed(1)} / 5</CardTitle>
            </CardHeader>
          </Card>
        </div>

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

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart" size={20} />
                    План vs Факт
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="план" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="факт" fill="#22c55e" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} />
                    Распределение оценок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ratingDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ratingDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Динамика выполнения плана
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="процент" 
                      stroke="#9b87f5" 
                      strokeWidth={3}
                      dot={{ fill: '#9b87f5', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id} className="hover-scale animate-fade-in">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{employee.name}</CardTitle>
                        <CardDescription>ID: {employee.id}</CardDescription>
                      </div>
                      <Badge 
                        className="text-lg px-3 py-1"
                        style={{ 
                          backgroundColor: getRatingColor(employee.rating),
                          color: 'white'
                        }}
                      >
                        {employee.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">План:</span>
                        <span className="font-semibold">{employee.plan.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Факт:</span>
                        <span className="font-semibold">{employee.fact.toLocaleString()} ₽</span>
                      </div>
                      <Progress value={employee.percentage} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Выполнение:</span>
                        <span className="font-bold text-lg" style={{ color: getRatingColor(employee.rating) }}>
                          {employee.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {employee.additionalMetrics.length > 0 && (
                      <div className="pt-4 border-t space-y-2">
                        <p className="text-sm font-semibold text-slate-700">Доп. метрики:</p>
                        {employee.additionalMetrics.map(metric => (
                          <div key={metric.id} className="text-xs text-slate-600">
                            {metric.name}: {metric.percentage.toFixed(1)}%
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Icon name="Edit" size={14} />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Icon name="FileText" size={14} />
                        Детали
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Подробная аналитика</CardTitle>
                <CardDescription>Полная статистика по всем сотрудникам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Сотрудник</th>
                        <th className="text-right p-4 font-semibold">План</th>
                        <th className="text-right p-4 font-semibold">Факт</th>
                        <th className="text-right p-4 font-semibold">%</th>
                        <th className="text-center p-4 font-semibold">Оценка</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, idx) => (
                        <tr key={emp.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-4 font-medium">{emp.name}</td>
                          <td className="p-4 text-right">{emp.plan.toLocaleString()} ₽</td>
                          <td className="p-4 text-right">{emp.fact.toLocaleString()} ₽</td>
                          <td className="p-4 text-right font-semibold">{emp.percentage.toFixed(1)}%</td>
                          <td className="p-4 text-center">
                            <Badge 
                              style={{ 
                                backgroundColor: getRatingColor(emp.rating),
                                color: 'white'
                              }}
                            >
                              {emp.rating}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="UserPlus" size={20} />
                  Добавить сотрудника
                </CardTitle>
                <CardDescription>Введите данные для расчета оценки</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО сотрудника</Label>
                    <Input
                      id="name"
                      placeholder="Иванов Иван"
                      value={newEmployeeName}
                      onChange={(e) => setNewEmployeeName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">План (₽)</Label>
                    <Input
                      id="plan"
                      type="number"
                      placeholder="80000"
                      value={newPlan}
                      onChange={(e) => setNewPlan(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fact">Факт (₽)</Label>
                    <Input
                      id="fact"
                      type="number"
                      placeholder="72000"
                      value={newFact}
                      onChange={(e) => setNewFact(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={addEmployee} size="lg" className="w-full gap-2">
                  <Icon name="Plus" size={20} />
                  Добавить сотрудника
                </Button>

                <div className="mt-8 p-6 bg-slate-50 rounded-lg border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Шкала оценки
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: getRatingColor(0), color: 'white' }}>0</Badge>
                      <span>0–10% выполнения</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: getRatingColor(1), color: 'white' }}>1</Badge>
                      <span>11–35% выполнения</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: getRatingColor(2), color: 'white' }}>2</Badge>
                      <span>36–50% выполнения</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: getRatingColor(3), color: 'white' }}>3</Badge>
                      <span>51–65% выполнения</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: getRatingColor(4), color: 'white' }}>4</Badge>
                      <span>66–79% выполнения</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge style={{ backgroundColor: getRatingColor(5), color: 'white' }}>5</Badge>
                      <span>80–100% выполнения</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;