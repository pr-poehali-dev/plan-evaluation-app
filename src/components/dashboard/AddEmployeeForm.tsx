import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getRatingColor } from '@/utils/calculations';

interface AddEmployeeFormProps {
  newEmployeeName: string;
  setNewEmployeeName: (value: string) => void;
  newPlan: string;
  setNewPlan: (value: string) => void;
  newFact: string;
  setNewFact: (value: string) => void;
  onAddEmployee: () => void;
}

const AddEmployeeForm = ({ 
  newEmployeeName, 
  setNewEmployeeName, 
  newPlan, 
  setNewPlan, 
  newFact, 
  setNewFact, 
  onAddEmployee 
}: AddEmployeeFormProps) => {
  return (
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

        <Button onClick={onAddEmployee} size="lg" className="w-full gap-2">
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
  );
};

export default AddEmployeeForm;
