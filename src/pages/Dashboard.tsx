import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Employee } from '@/types/employee';
import { calculatePercentage, calculateRating, getRatingColor } from '@/utils/calculations';

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
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newPlan, setNewPlan] = useState('');
  const [newFact, setNewFact] = useState('');
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const addEmployee = () => {
    if (!newName || !newPlan || !newFact) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    const plan = parseFloat(newPlan);
    const fact = parseFloat(newFact);
    const percentage = calculatePercentage(fact, plan);
    const rating = calculateRating(percentage);

    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: newName,
      plan,
      fact,
      percentage,
      rating,
      additionalMetrics: [],
      perishableProducts: [],
      urgentSales: []
    };

    setEmployees([...employees, newEmployee]);
    setNewName('');
    setNewPlan('');
    setNewFact('');
    toast({ title: 'Сотрудник добавлен', description: `${newName} добавлен в систему` });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Оценка эффективности</h1>
            <p className="text-slate-600">Расчет выполнения плана</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>План</CardDescription>
              <CardTitle className="text-2xl">{stats.totalPlan.toLocaleString()} ₽</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Факт</CardDescription>
              <CardTitle className="text-2xl">{stats.totalFact.toLocaleString()} ₽</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Средний %</CardDescription>
              <CardTitle className="text-2xl">{stats.avgPercentage.toFixed(1)}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Оценка</CardDescription>
              <CardTitle className="text-2xl">{stats.avgRating.toFixed(1)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Добавить сотрудника</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>ФИО</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
              </div>
              <div>
                <Label>План ₽</Label>
                <Input type="number" value={newPlan} onChange={(e) => setNewPlan(e.target.value)} />
              </div>
              <div>
                <Label>Факт ₽</Label>
                <Input type="number" value={newFact} onChange={(e) => setNewFact(e.target.value)} />
              </div>
            </div>
            <Button onClick={addEmployee}>Добавить</Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {employees.map((emp) => {
            const isExpanded = expandedEmployee === emp.id;
            return (
              <Card key={emp.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-xl">{emp.name}</CardTitle>
                        <CardDescription>
                          План: {emp.plan.toLocaleString()} ₽ • Факт: {emp.fact.toLocaleString()} ₽
                        </CardDescription>
                      </div>
                      <Badge 
                        className="text-lg px-3 py-1"
                        style={{ backgroundColor: getRatingColor(emp.rating), color: 'white' }}
                      >
                        {emp.rating}
                      </Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setExpandedEmployee(isExpanded ? null : emp.id)}
                    >
                      <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
                    </Button>
                  </div>
                  <div className="mt-3">
                    <Progress value={emp.percentage} className="h-2" />
                    <p className="text-sm text-right mt-1 font-semibold" style={{ color: getRatingColor(emp.rating) }}>
                      {emp.percentage.toFixed(1)}%
                    </p>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-4 pt-0">
                    {emp.additionalMetrics.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Дополнительные метрики</h4>
                        <table className="w-full text-sm border rounded">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="text-left p-2">Показатель</th>
                              <th className="text-right p-2">План</th>
                              <th className="text-right p-2">Факт</th>
                              <th className="text-right p-2">%</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emp.additionalMetrics.map((m) => (
                              <tr key={m.id} className="border-t">
                                <td className="p-2">{m.name}</td>
                                <td className="text-right p-2">{m.plan}</td>
                                <td className="text-right p-2">{m.fact}</td>
                                <td className="text-right p-2 font-semibold">{m.percentage.toFixed(1)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {emp.perishableProducts.map((table) => (
                      <div key={table.id}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Скоропортящиеся: {table.tableName}</h4>
                          <Badge>Общий: {table.totalPercentage.toFixed(1)}%</Badge>
                        </div>
                        <table className="w-full text-sm border rounded">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="text-left p-2">Продукт</th>
                              <th className="text-right p-2">План</th>
                              <th className="text-right p-2">Факт</th>
                              <th className="text-right p-2">%</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.items.map((item) => (
                              <tr key={item.id} className="border-t">
                                <td className="p-2">{item.name}</td>
                                <td className="text-right p-2">{item.plan}</td>
                                <td className="text-right p-2">{item.fact}</td>
                                <td className="text-right p-2 font-semibold">{item.percentage.toFixed(1)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}

                    {emp.urgentSales.map((table) => (
                      <div key={table.id}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Срочные продажи (БП): {table.tableName}</h4>
                          <Badge>Общий: {table.totalPercentage.toFixed(1)}%</Badge>
                        </div>
                        <table className="w-full text-sm border rounded">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="text-left p-2">Товар</th>
                              <th className="text-right p-2">План</th>
                              <th className="text-right p-2">Факт</th>
                              <th className="text-right p-2">%</th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.items.map((item) => (
                              <tr key={item.id} className="border-t">
                                <td className="p-2">{item.name}</td>
                                <td className="text-right p-2">{item.plan}</td>
                                <td className="text-right p-2">{item.fact}</td>
                                <td className="text-right p-2 font-semibold">{item.percentage.toFixed(1)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
