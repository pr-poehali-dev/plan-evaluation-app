import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/employee';
import { getRatingColor } from '@/utils/calculations';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <Card className="hover-scale animate-fade-in">
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
  );
};

export default EmployeeCard;
