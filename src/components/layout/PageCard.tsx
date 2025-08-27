import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface PageCardProps {
  code: string;
  title: string;
  description: string;
  to: string;
  type: 'CORE' | 'ADV' | 'MGT';
  icon: React.ElementType;
}

const PageCard: React.FC<PageCardProps> = ({ code, title, description, to, type, icon: Icon }) => {
  const typeColors = {
    CORE: 'bg-blue-100 text-blue-800 border-blue-200',
    ADV: 'bg-purple-100 text-purple-800 border-purple-200',
    MGT: 'bg-green-100 text-green-800 border-green-200',
  };

  const iconColors = {
    CORE: 'bg-blue-200 text-blue-800',
    ADV: 'bg-purple-200 text-purple-800',
    MGT: 'bg-green-200 text-green-800',
  }

  return (
    <Link to={to} className="group block h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card
        className="h-full flex flex-col transition-all duration-200 ease-in-out border-border/60 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1"
        tabIndex={-1} // The link itself is focusable
      >
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className={`p-2 rounded-lg ${iconColors[type]}`}>
              {Icon && <Icon className="w-6 h-6" />}
            </div>
            <Badge variant="outline" className={typeColors[type]}>{code}</Badge>
          </div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
            <div className="flex items-center text-primary font-semibold">
                Open
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PageCard;
