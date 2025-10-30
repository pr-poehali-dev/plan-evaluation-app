import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/employee';
import { getRatingColor } from '@/utils/calculations';

interface EmployeeDetailsDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeDetailsDialog = ({ employee, open, onOpenChange }: EmployeeDetailsDialogProps) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl">{employee.name}</span>
            <Badge 
              className="text-xl px-4 py-2"
              style={{ 
                backgroundColor: getRatingColor(employee.rating),
                color: 'white'
              }}
            >
              Оценка: {employee.rating}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            ID: {employee.id} • Полная информация по всем показателям
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={20} />
                Основные показатели
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">План</p>
                  <p className="text-2xl font-bold">{employee.plan.toLocaleString()} ₽</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Факт</p>
                  <p className="text-2xl font-bold">{employee.fact.toLocaleString()} ₽</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Процент выполнения</span>
                  <span 
                    className="font-bold text-lg" 
                    style={{ color: getRatingColor(employee.rating) }}
                  >
                    {employee.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={employee.percentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {employee.additionalMetrics.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ListChecks" size={20} />
                  Дополнительные метрики
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-3 font-semibold">Показатель</th>
                        <th className="text-right p-3 font-semibold">План</th>
                        <th className="text-right p-3 font-semibold">Факт</th>
                        <th className="text-right p-3 font-semibold">%</th>
                        <th className="text-right p-3 font-semibold w-32">Прогресс</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.additionalMetrics.map((metric, idx) => (
                        <tr key={metric.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 font-medium">{metric.name}</td>
                          <td className="p-3 text-right">{metric.plan}</td>
                          <td className="p-3 text-right">{metric.fact}</td>
                          <td className="p-3 text-right font-semibold">
                            {metric.percentage.toFixed(1)}%
                          </td>
                          <td className="p-3">
                            <Progress value={metric.percentage} className="h-2" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {employee.perishableProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingBasket" size={20} />
                  Скоропортящиеся продукты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {employee.perishableProducts.map((table) => (
                  <div key={table.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{table.tableName}</h4>
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        Общий %: {table.totalPercentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="text-left p-3 font-semibold">Продукт</th>
                            <th className="text-right p-3 font-semibold">План</th>
                            <th className="text-right p-3 font-semibold">Факт</th>
                            <th className="text-right p-3 font-semibold">%</th>
                            <th className="text-right p-3 font-semibold w-32">Прогресс</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.items.map((item, idx) => (
                            <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              <td className="p-3 font-medium">{item.name}</td>
                              <td className="p-3 text-right">{item.plan}</td>
                              <td className="p-3 text-right">{item.fact}</td>
                              <td className="p-3 text-right font-semibold">
                                {item.percentage.toFixed(1)}%
                              </td>
                              <td className="p-3">
                                <Progress value={item.percentage} className="h-2" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {employee.urgentSales.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" size={20} />
                  Срочные продажи (БП)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {employee.urgentSales.map((table) => (
                  <div key={table.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{table.tableName}</h4>
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        Общий %: {table.totalPercentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="text-left p-3 font-semibold">Товар</th>
                            <th className="text-right p-3 font-semibold">План</th>
                            <th className="text-right p-3 font-semibold">Факт</th>
                            <th className="text-right p-3 font-semibold">%</th>
                            <th className="text-right p-3 font-semibold w-32">Прогресс</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.items.map((item, idx) => (
                            <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              <td className="p-3 font-medium">{item.name}</td>
                              <td className="p-3 text-right">{item.plan}</td>
                              <td className="p-3 text-right">{item.fact}</td>
                              <td className="p-3 text-right font-semibold">
                                {item.percentage.toFixed(1)}%
                              </td>
                              <td className="p-3">
                                <Progress value={item.percentage} className="h-2" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;