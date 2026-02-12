import { useQuery } from '@tanstack/react-query';
import { getCareers, getContacts } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MessageSquare, Users } from 'lucide-react';

const DashboardHome = () => {
  const { data: careers = [] } = useQuery({ queryKey: ['careers'], queryFn: getCareers });
  const { data: contacts = [] } = useQuery({ queryKey: ['contacts'], queryFn: getContacts });

  const stats = [
    {
      title: "Total Job Openings",
      value: careers.length,
      icon: Briefcase,
      desc: "Active jobs on career page"
    },
    {
      title: "Total Messages",
      value: contacts.length,
      icon: MessageSquare,
      desc: "Inquiries & Applications"
    },
    {
      title: "Applications Received",
      value: contacts.filter((c: any) => c.subject && c.subject.includes('Application')).length,
      icon: Users,
      desc: "Filtered by subject line"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-display font-bold">Dashboard Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;