import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface StatsCardsProps {
  stats: {
    totalPlan: number;
    totalFact: number;
    avgPercentage: number;
    avgRating: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
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
  );
};

export default StatsCards;
