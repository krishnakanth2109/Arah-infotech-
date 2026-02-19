import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  Briefcase, 
  MessageSquare, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getCareers, getApplications, getContacts } from '@/lib/api';

const DashboardHome = () => {
  // 1. Fetch Data
  const { data: careers = [] } = useQuery({ 
    queryKey: ['careers'], 
    queryFn: getCareers 
  });

  const { data: applications = [] } = useQuery({ 
    queryKey: ['applications'], 
    queryFn: getApplications 
  });

  const { data: contacts = [] } = useQuery({ 
    queryKey: ['contacts'], 
    queryFn: getContacts 
  });

  // 2. Process Data for Charts

  // -- Pie Chart: Applications by Status --
  const statusCounts = applications.reduce((acc: any, app: any) => {
    const status = app.status || 'Pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // -- Bar Chart: Applications per Job Role --
  const jobCounts = applications.reduce((acc: any, app: any) => {
    const title = app.jobTitle || 'Unknown';
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(jobCounts).map(title => ({
    name: title.length > 15 ? title.substring(0, 15) + '...' : title,
    Applicants: jobCounts[title]
  })).sort((a, b) => b.Applicants - a.Applicants).slice(0, 5);

  // 3. Stats Cards Data
  const stats = [
    {
      title: "Total Job Openings",
      value: careers.length,
      icon: Briefcase,
      desc: "Active listings",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Total Applications",
      value: applications.length,
      icon: Users,
      desc: "Candidates applied",
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "General Messages",
      value: contacts.length,
      icon: MessageSquare,
      desc: "Contact form inquiries",
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Conversion Rate",
      value: applications.length > 0
        ? `${Math.round((applications.filter((a: any) => a.status === 'Shortlisted').length / applications.length) * 100)}%`
        : "0%",
      icon: TrendingUp,
      desc: "Shortlisted candidates",
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-display font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Bar Chart - Top Jobs */}
        <Card className="col-span-4 shadow-sm border-none bg-card/50">
          <CardHeader>
            <CardTitle>Top Jobs by Applications</CardTitle>
            <CardDescription>
              Which positions are attracting the most candidates?
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: 'transparent' }}
                    />
                    <Bar 
                      dataKey="Applicants" 
                      fill="currentColor" 
                      radius={[4, 4, 0, 0]} 
                      className="fill-primary" 
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No application data available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Application Status */}
        <Card className="col-span-3 shadow-sm border-none bg-card/50">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>
              Distribution of current candidate statuses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No data to display.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DashboardHome;