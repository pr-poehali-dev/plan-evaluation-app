import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';
import { getRatingColor } from '@/utils/calculations';

interface AnalyticsTableProps {
  employees: Employee[];
}

const AnalyticsTable = ({ employees }: AnalyticsTableProps) => {
  return (
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
  );
};

export default AnalyticsTable;
